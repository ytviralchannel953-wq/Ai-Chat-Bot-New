import React, { useState } from 'react';
import { CheckCircle, Code, Link as LinkIcon, Terminal, Copy, Check, Shield, Zap, ArrowRight } from 'lucide-react';
import { WhopService } from '../services/whop';

export const WhopGuide: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(`npm install @whop-apps/sdk`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = (status: boolean) => {
    WhopService.toggleSimulation(status);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 h-full overflow-y-auto custom-scrollbar">
      <div className="p-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Integration Hub</h1>
            <p className="text-slate-400">Follow the "1-Link Method" below to launch your app.</p>
          </div>
          <div className="bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-400 font-medium text-sm">System Ready</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: The 3 Steps */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1 */}
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <Terminal className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">1. Install Package</h3>
                  <p className="text-slate-400 text-sm mb-4">Run this in your project terminal:</p>
                  
                  <div className="bg-slate-900 rounded-lg p-3 flex items-center justify-between border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition-colors" onClick={copyCode}>
                    <code className="text-emerald-400 font-mono text-sm">npm install @whop-apps/sdk</code>
                    <button className="text-slate-500 hover:text-white transition-colors">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: The 1 Link */}
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <LinkIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                     <h3 className="text-lg font-semibold text-white mb-2">2. Add Your Link</h3>
                     <span className="text-[10px] uppercase font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Crucial Step</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    Go to <code className="text-blue-300">services/whop.ts</code> and paste your product link in the config variable.
                  </p>
                  <div className="p-4 bg-slate-900 rounded border border-slate-800 text-xs font-mono text-slate-300 relative">
                    <span className="text-purple-400">const</span> PRODUCT_PATH = <span className="text-emerald-300">'checkout/your-link-here'</span>;
                    
                    <div className="absolute -right-2 -top-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full shadow-lg animate-bounce">
                      Update this!
                    </div>
                  </div>
                </div>
              </div>
            </div>

             {/* Step 3 */}
             <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6243]" />
              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <Code className="w-6 h-6 text-[#FF6243]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">3. Enable Production</h3>
                  <p className="text-slate-400 text-sm">
                    Uncomment the lines marked <span className="text-emerald-400 font-mono text-xs bg-emerald-500/10 px-1 rounded">PROD</span> in <code className="text-slate-200">services/whop.ts</code>. The app will then automatically verify licenses using the "Power Method".
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Control Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white text-sm">Access Simulator</span>
                </div>
                
                <div className="p-5 space-y-6">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Test how the app responds to different user states before deploying to Whop.
                  </p>

                  <div className="space-y-3">
                    <button 
                      onClick={() => handleSimulate(true)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all group"
                    >
                      <div className="text-left">
                        <div className="text-emerald-400 font-semibold text-sm">Simulate Owner</div>
                        <div className="text-emerald-500/60 text-[10px]">Has Valid Pass</div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-500 opacity-50 group-hover:opacity-100" />
                    </button>

                    <button 
                      onClick={() => handleSimulate(false)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 transition-all group"
                    >
                      <div className="text-left">
                        <div className="text-slate-300 font-semibold text-sm">Simulate New User</div>
                        <div className="text-slate-500 text-[10px]">No Pass Found</div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-slate-600 group-hover:border-slate-500" />
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50">
                    <button onClick={() => WhopService.openCheckout()} className="w-full flex items-center justify-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors py-2">
                      <span>Test "1 Link" Redirect</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};