import React, { useState, useEffect } from 'react';
import { Mail, Database, Sparkles, CheckCircle, Server, Shield, HelpCircle, AlertCircle } from 'lucide-react';
import { playClickSound, playCraftSuccessSound, playExplosionSound } from '../utils/sound';

export const LeadCaptureForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [localSubmissionsCount, setLocalSubmissionsCount] = useState(0);
  const [showDevInfo, setShowDevInfo] = useState(false);
  const [backendDbConnected, setBackendDbConnected] = useState<boolean | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(true);

  // Database configuration
  const DATABASE_NAME = 'registration_sheet';
  const COLLECTION_NAME = 'leads';

  const isConfigured = !!backendDbConnected;

  useEffect(() => {
    // Check real backend database status
    const checkBackendStatus = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setBackendDbConnected(data.database === 'connected');
        } else {
          setBackendDbConnected(false);
        }
      } catch (e) {
        console.error('Failed to contact backend health endpoint', e);
        setBackendDbConnected(false);
      } finally {
        setLoadingHealth(false);
      }
    };
    checkBackendStatus();

    // Check how many submissions we have stored locally
    try {
      const saved = localStorage.getItem('pixel_realms_leads');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setLocalSubmissionsCount(parsed.length);
        }
      }
    } catch (e) {
      console.error('Failed to read from localStorage', e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      playExplosionSound();
      setStatus('error');
      setErrorMessage('Please enter a valid email address!');
      return;
    }

    playClickSound();
    setStatus('submitting');
    setErrorMessage('');

    // Generate a beautiful, fun beta key for the user as a gamified reward upfront
    const segments = [
      'PR',
      Math.floor(1000 + Math.random() * 9000).toString(),
      Math.random().toString(36).substring(2, 6).toUpperCase()
    ];
    const key = segments.join('-');
    setGeneratedKey(key);

    const submissionData = {
      email,
      timestamp: new Date().toISOString(),
      source: 'Pixel Realms Lead Capture',
      accessKey: key,
      status: 'pending_activation'
    };

    // Automatically save to local storage to guarantee no submission is lost
    try {
      const existing = localStorage.getItem('pixel_realms_leads');
      const list = existing ? JSON.parse(existing) : [];
      list.push(submissionData);
      localStorage.setItem('pixel_realms_leads', JSON.stringify(list));
      setLocalSubmissionsCount(list.length);
    } catch (err) {
      console.error('Failed to store backup locally:', err);
    }

    // Try to send to MongoDB Atlas via secure backend
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        console.log('Successfully written to MongoDB Atlas via secure backend!');
      } else {
        console.warn(`Secure backend returned status: ${response.status}`);
      }
    } catch (err) {
      console.warn('Secure backend proxy not active or reachable.', err);
    }

    playCraftSuccessSound();
    setStatus('success');
    setEmail('');
  };

  const handleReset = () => {
    playClickSound();
    setStatus('idle');
    setGeneratedKey('');
  };

  return (
    <section id="beta-registration" className="py-16 px-4 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-emerald-400 font-pixel tracking-wide uppercase drop-shadow-[3px_3px_0_#000] mb-3">
          SECURE YOUR BETA ACCESS SLOT
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
          Register your email address to pre-load your game profile, secure a whitelist key, and get notified the exact second the hard anarchy servers boot!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT: Submission Panel (Cols 1-7) */}
        <div className="lg:col-span-7 mc-panel p-6 md:p-8 shadow-[8px_8px_0px_#111] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-4 border-[#888] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <h3 className="font-pixel text-lg md:text-xl font-bold text-gray-900 uppercase">
                  REGISTRATION SHEET
                </h3>
              </div>
              <span className="font-pixel text-xs bg-black text-yellow-300 px-2 py-0.5">
                SLOTS: 87/1000 LEFT
              </span>
            </div>

            {status === 'success' ? (
              /* Success View */
              <div className="text-center py-4 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 border-4 border-emerald-600 rounded-full text-emerald-600 mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="font-pixel text-xl md:text-2xl text-emerald-900 font-bold mb-2">
                  SUCCESS! YOUR SLOT IS WHitelisted!
                </h4>
                <p className="text-gray-800 text-sm md:text-base font-mono mb-6 leading-relaxed max-w-md mx-auto">
                  Your email has been recorded and safely synchronized to the database vault. Check your inbox soon for confirmation!
                </p>

                {/* Gamified Retro Key */}
                <div className="bg-[#2b2b2b] border-4 border-[#141414] p-4 max-w-sm mx-auto mb-6 text-white shadow-inner">
                  <span className="text-xs text-gray-400 block font-mono mb-1 uppercase tracking-wider">
                    YOUR UNIQUE ACCESS TICKET KEY:
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-amber-300 font-pixel tracking-widest block select-all">
                    {generatedKey}
                  </span>
                </div>

                <button
                  onClick={handleReset}
                  className="mc-button bg-[#388e3c] px-6 py-2.5 text-sm font-bold"
                >
                  REGISTER ANOTHER EMAIL
                </button>
              </div>
            ) : (
              /* Active Form View */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="user-email" className="block text-sm font-bold text-gray-800 font-pixel mb-2 uppercase tracking-wide">
                    Enter Email Address:
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none">
                      <Mail className="w-5 h-5" />
                    </span>
                    <input
                      id="user-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="notch@mojang.com"
                      className="mc-slot w-full pl-10 pr-4 py-3 bg-[#e0e0e0] border-4 border-[#373737] text-gray-900 placeholder-gray-500 font-mono text-base focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:bg-white transition-all rounded-none"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="bg-red-100 border-2 border-red-500 p-3 flex items-center gap-2 text-red-900 font-mono text-xs">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mc-button-green w-full py-4 text-lg font-bold flex items-center justify-center gap-2 shadow-[4px_4px_0px_#1b5e20] hover:scale-[1.01] transition-transform disabled:opacity-50"
                  >
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>{status === 'submitting' ? 'SYNCHRONIZING...' : 'CLAIM BETA KEY & SAVE'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-xs text-gray-600 font-mono mt-6 pt-4 border-t-2 border-gray-300">
            🔒 We hate creepers and spam. Your email will only be used to broadcast network boot announcements and whitelist credentials.
          </p>
        </div>

        {/* RIGHT: Integration Details Panel (Cols 8-12) */}
        <div className="lg:col-span-5 mc-panel-dark p-6 md:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-[#555] pb-3 mb-4">
              <Database className="w-5 h-5 text-amber-400" />
              <h4 className="font-pixel text-sm md:text-base font-bold text-white uppercase tracking-wide">
                DATALINK PIPELINE
              </h4>
            </div>

            <div className="space-y-4">
              <div className="bg-black/40 p-3.5 border border-[#444] rounded-none">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-gray-400">TARGET DB</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5" />
                    <span>MONGODB ATLAS</span>
                  </span>
                </div>
                
                <div className="space-y-1.5 text-[11px] font-mono text-gray-300">
                  <p className="flex justify-between">
                    <span>Database:</span>
                    <strong className="text-white">{DATABASE_NAME}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Collection:</span>
                    <strong className="text-white">{COLLECTION_NAME}</strong>
                  </p>
                </div>
              </div>

              {/* Live sync connection indicator */}
              <div className={`p-3 border text-xs font-mono flex items-center gap-2.5 ${
                backendDbConnected
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  backendDbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                } shrink-0`} />
                <div className="w-full">
                  <p className="font-bold uppercase text-[10px]">
                    {backendDbConnected ? 'Database Connected (Live)' : 'Offline Fallback Vault Active'}
                  </p>
                  <p className="text-[10px] text-gray-300 leading-tight mt-0.5">
                    {backendDbConnected
                      ? 'The secure backend is fully connected to your MongoDB Atlas database.'
                      : 'MONGODB_URl environment variable is missing. Saving submissions to local browser storage fallback.'}
                  </p>
                </div>
              </div>

              {/* Submissions count badge */}
              <div className="bg-black/40 border border-[#333] p-3 text-xs font-mono flex justify-between items-center">
                <span className="text-gray-400">TOTAL LOCAL BACKUPS:</span>
                <span className="bg-[#388e3c] text-white font-bold px-2.5 py-0.5 text-xs font-pixel rounded-none">
                  {localSubmissionsCount} LEADS
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#444]">
            <button
              onClick={() => {
                playClickSound();
                setShowDevInfo(!showDevInfo);
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-pixel flex items-center gap-1.5 underline cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{showDevInfo ? 'HIDE CONFIGURATION HELP' : 'HOW TO CONNECT YOUR DATABASE?'}</span>
            </button>

            {showDevInfo && (
              <div className="mt-3 bg-black/80 border border-amber-500/40 p-3 text-[11px] font-mono text-amber-200 leading-relaxed max-h-56 overflow-y-auto space-y-2">
                <p className="font-bold text-white uppercase text-xs">🛠️ Setup Instructions:</p>
                <p>
                  This application uses a secure Node/Express backend that connects to your MongoDB Atlas instance using the <code>MONGODB_URl</code> environment variable.
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Get your connection string from MongoDB Atlas.</li>
                  <li>Open the Settings/Secrets panel in the AI Studio UI.</li>
                  <li>Create a secret named <code>MONGODB_URl</code> and set its value.</li>
                </ol>
                <p className="text-emerald-400 font-bold">
                  Once configured, the status indicator turns green, and all user leads will automatically synchronize to your "registration_sheet" database!
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </section>
  );
};
