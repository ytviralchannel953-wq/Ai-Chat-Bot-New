import React, { useState } from 'react';
import { generateImage } from '../services/gemini';
import { Download, Loader2, Image as ImageIcon, Sparkles, Ratio, Monitor, Smartphone, Square } from 'lucide-react';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setGeneratedImage(null);

    const result = await generateImage(prompt, aspectRatio);
    setGeneratedImage(result);
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-chat-bot-gen-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Controls Section */}
      <div className="lg:w-1/3 space-y-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg">
          <div className="flex items-center gap-2 mb-6 text-purple-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Creation Studio</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the betting slip, team logo, or sports scene you want to generate..."
                className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm font-medium mb-3">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setAspectRatio('1:1')}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    aspectRatio === '1:1'
                      ? 'bg-purple-500/10 border-purple-500 text-purple-400'
                      : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-600'
                  }`}
                >
                  <Square className="w-5 h-5 mb-1" />
                  <span className="text-xs">Square</span>
                </button>
                <button
                  onClick={() => setAspectRatio('16:9')}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    aspectRatio === '16:9'
                      ? 'bg-purple-500/10 border-purple-500 text-purple-400'
                      : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-600'
                  }`}
                >
                  <Monitor className="w-5 h-5 mb-1" />
                  <span className="text-xs">Landscape</span>
                </button>
                <button
                  onClick={() => setAspectRatio('9:16')}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    aspectRatio === '9:16'
                      ? 'bg-purple-500/10 border-purple-500 text-purple-400'
                      : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-600'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-1" />
                  <span className="text-xs">Portrait</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  <span>Generate Artwork</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden min-h-[400px]">
        {generatedImage ? (
          <div className="relative group w-full h-full flex items-center justify-center p-4">
             {/* Background blur effect */}
             <div 
               className="absolute inset-0 bg-cover bg-center opacity-10 blur-3xl"
               style={{ backgroundImage: `url(${generatedImage})` }}
             />
             
             <img 
               src={generatedImage} 
               alt="Generated Result" 
               className="max-w-full max-h-[600px] rounded-lg shadow-2xl z-10 object-contain"
             />
             
             <div className="absolute top-4 right-4 z-20">
               <button
                 onClick={handleDownload}
                 className="bg-slate-950/80 hover:bg-slate-950 text-white p-3 rounded-lg backdrop-blur-sm border border-slate-700 transition-all shadow-lg flex items-center gap-2 group-hover:opacity-100 opacity-0"
               >
                 <Download className="w-5 h-5" />
                 <span className="text-sm font-medium">Download</span>
               </button>
             </div>
          </div>
        ) : (
          <div className="text-center space-y-4 max-w-sm px-6">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto border border-slate-700">
              <Sparkles className="w-10 h-10 text-slate-600" />
            </div>
            <div>
              <h3 className="text-slate-300 font-medium text-lg">Ready to Create</h3>
              <p className="text-slate-500 text-sm mt-2">
                Enter a prompt to generate high-quality images using Gemini Flash Image. Perfect for social media posts or thumbnails.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};