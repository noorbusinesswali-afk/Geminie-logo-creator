import React from 'react';
import { Download, Sparkles, Share2 } from 'lucide-react';
import { GeneratedLogo } from '../types';

interface LogoDisplayProps {
  currentLogo: GeneratedLogo | null;
  isLoading: boolean;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ currentLogo, isLoading }) => {
  const handleDownload = () => {
    if (!currentLogo) return;
    const link = document.createElement('a');
    link.href = currentLogo.imageUrl;
    link.download = `${currentLogo.data.name.replace(/\s+/g, '_')}_logo.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden relative shadow-xl flex items-center justify-center min-h-[400px]">
        {isLoading ? (
          <div className="text-center space-y-4 p-8">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-400 font-medium animate-pulse">Consulting creative AI models...</p>
          </div>
        ) : currentLogo ? (
          <div className="relative w-full h-full p-8 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
             <img 
               src={currentLogo.imageUrl} 
               alt="Generated Logo" 
               className="max-w-full max-h-full rounded-lg shadow-2xl object-contain hover:scale-[1.02] transition-transform duration-500"
             />
          </div>
        ) : (
          <div className="text-center space-y-4 p-8 opacity-50">
            <Sparkles className="w-16 h-16 mx-auto text-slate-600" />
            <h3 className="text-xl font-semibold text-slate-300">Ready to Create</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Enter your brand details on the left to generate a professional logo in seconds using Gemini AI.
            </p>
          </div>
        )}
      </div>

      {currentLogo && !isLoading && (
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-xl font-medium transition-colors border border-slate-600"
          >
            <Download className="w-5 h-5" />
            Download PNG
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 px-4 rounded-xl font-medium transition-colors border border-slate-700"
            title="Share (Mock)"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoDisplay;