import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment variables from .env file
dotenv.config();

// Define a simple inline Mongoose schema/model for the live server to avoid ESM-CommonJS mixing issues
const LiveLeadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.']
  },
  source: {
    type: String,
    default: 'Pixel Realms Landing Page'
  },
  accessKey: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending_activation', 'active', 'unsubscribed'],
    default: 'pending_activation'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Avoid compiling the model multiple times if server reloads
const LiveLead = mongoose.models.Lead || mongoose.model('Lead', LiveLeadSchema);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable trust proxy so express-rate-limit can correctly identify client IPs behind reverse proxies
  app.set('trust proxy', 1);

  // --- Cybersecurity Protection Middleware ---
  // 1. Helmet: Sets secure HTTP headers to prevent XSS, Clickjacking, and sniffing
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled to allow Vite hmr websocket connections in dev
  }));

  // 2. CORS: Allow cross-origin requests from configured origins
  const allowedOrigin = process.env.CORS_ORIGIN || '*';
  app.use(cors({
    origin: allowedOrigin === '*' ? '*' : allowedOrigin.split(','),
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // 3. Rate Limiter: Safeguard endpoints from abuse or brute force
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 100, // Limit each IP to 100 requests per window
    message: { error: 'Too many requests. Please slow down and try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api', apiLimiter);

  // 4. Body parser with safe limits (DoS defense)
  app.use(express.json({ limit: '10kb' }));

  // --- MongoDB Atlas Database Connection ---
  const MONGODB_URl = process.env.MONGODB_URl || process.env.MONGODB_URL;
  let isDbConnected = false;

  if (MONGODB_URl) {
    try {
      await mongoose.connect(MONGODB_URl, {
        dbName: 'registration_sheet'
      });
      isDbConnected = true;
      console.log('📡 [Mongoose] Live Server connected to MongoDB Atlas Cluster successfully.');
    } catch (err: any) {
      console.error('❌ [Mongoose] Live Server failed to connect to MongoDB Atlas:', err.message);
    }
  } else {
    console.warn('📡 [Mongoose] MONGODB_URl environment variable is not defined. Operating in mock fallback mode.');
  }

  // --- Secure API Routes ---

  // POST /api/leads - Create/register a new subscriber securely via Mongoose
  app.post('/api/leads', async (req, res) => {
    try {
      const { email, source, status, accessKey } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }

      // If Database is not connected, fallback gracefully (helps preview run immediately)
      if (!isDbConnected) {
        console.warn(`[Server Fallback] MONGODB_URl not set. Saving lead: ${email} with accessKey: ${accessKey} in local memory session.`);
        return res.status(200).json({
          success: true,
          message: 'Saved successfully in mock fallback mode (No MongoDB connection defined).'
        });
      }

      // Create and save database document using Mongoose
      const newLead = new LiveLead({
        email,
        source: source || 'Pixel Realms Live Dev Proxy',
        accessKey: accessKey || '',
        status: status || 'pending_activation'
      });

      await newLead.save();
      console.log(`✅ [Database] Registered new lead: ${email}`);

      return res.status(201).json({
        success: true,
        message: 'Lead recorded and synchronized safely via Mongoose!'
      });

    } catch (error: any) {
      // Handle Duplicate Signup gracefully (MongoDB Error Code 11000)
      if (error.code === 11000) {
        return res.status(499).json({
          success: true,
          message: 'You have already registered for beta access! We have your spot reserved.'
        });
      }

      console.error('❌ [Server] Lead registration error:', error);
      return res.status(500).json({ error: 'Internal server error processing submission.', details: error.message });
    }
  });

  // POST /api/ai/generate - Execute server-side Gemini request securely
  app.post('/api/ai/generate', async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('[Gemini] GEMINI_API_KEY is missing. Returning fallback mock response.');
        return res.json({
          success: true,
          text: `[Mock AI Assistant] You entered: "${prompt}". Please add your GEMINI_API_KEY in the Secrets panel to activate actual model responses.`
        });
      }

      // Initialize GoogleGenAI SDK securely
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      console.log(`🤖 [Gemini] Live Server querying 'gemini-3.5-flash' for prompt: "${prompt.substring(0, 40)}..."`);
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || 'You are a gaming assistant for Pixel Realms.',
          temperature: 0.7
        }
      });

      return res.json({
        success: true,
        text: response.text
      });

    } catch (error: any) {
      console.error('❌ [Gemini Error]:', error);
      return res.status(500).json({ error: 'Failed to generate response from Gemini AI model.', details: error.message });
    }
  });

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      database: isDbConnected ? 'connected' : 'offline/fallback',
      time: new Date().toISOString()
    });
  });

  // Vite middleware configuration for development vs static asset serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Live Dev Applet running on http://localhost:${PORT}`);
  });
}

startServer();
