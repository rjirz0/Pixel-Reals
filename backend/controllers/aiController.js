const { GoogleGenAI } = require('@google/genai');

/**
 * Handle AI Content Generation using Gemini API
 * POST /api/ai/generate
 */
exports.generateAIContent = async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Please provide a prompt for Gemini.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ [Gemini] GEMINI_API_KEY is not defined in backend env. Running in mock fallback mode.');
      return res.json({
        success: true,
        text: `[Fallback Mock Mode] Gemini received your prompt: "${prompt}". Configure GEMINI_API_KEY in your .env file to activate live model responses!`
      });
    }

    // Initialize the official @google/genai SDK on the server-side
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build' // Set for required telemetry tracking
        }
      }
    });

    console.log(`🤖 [Gemini] Querying model 'gemini-3.5-flash' with prompt: "${prompt.substring(0, 50)}..."`);

    // Call the model using the recommended SDK format
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'You are a helpful gaming assistant for Pixel Realms.',
        temperature: 0.7
      }
    });

    // Extract generated text directly from the response
    const generatedText = response.text;

    return res.json({
      success: true,
      text: generatedText
    });

  } catch (error) {
    console.error('❌ Gemini Controller Error:', error);
    return res.status(500).json({
      error: 'Failed to generate response from Gemini AI engine.',
      details: error.message
    });
  }
};
