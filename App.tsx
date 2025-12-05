import React, { useState } from 'react';
import LogoForm from './components/LogoForm';
import LogoDisplay from './components/LogoDisplay';
import { LogoFormData, LogoStyle, GeneratedLogo } from './types';
import { generateLogoImage } from './services/geminiService';
import { Hexagon, History } from 'lucide-react';

const App: React.FC = () => {
  const [formData, setFormData] = useState<LogoFormData>({
    name: '',
    style: LogoStyle.MODERN,
    colors: '',
    description: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<GeneratedLogo | null>(null);
  const [history, setHistory] = useState<GeneratedLogo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!formData.name) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = await generateLogoImage(formData);
      
      const newLogo: GeneratedLogo = {
        id: Date.now().toString(),
        imageUrl,
        prompt: `Logo for ${formData.name}`,
        timestamp: Date.now(),
        data: { ...formData }
      };

      setCurrentLogo(newLogo);
      setHistory(prev => [newLogo, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate logo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadFromHistory = (logo: GeneratedLogo) => {
    setCurrentLogo(logo);
    setFormData(logo.data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 text-slate-100 selection:bg-indigo-500/30">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-lg">
              <Hexagon className="w-6 h-6 text-white fill-white/20" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Gemini Logo Creator
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            Powered by gemini-2.5-flash-image
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-4 space-y-6">
            <LogoForm 
              formData={formData} 
              setFormData={setFormData} 
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Helper Tip */}
            <div className="bg-slate-800/30 border border-slate-800 rounded-lg p-4 text-xs text-slate-400 leading-relaxed">
              <strong>Pro Tip:</strong> Be specific with your color palette (e.g., "Cyberpunk Neon" vs "Blue") and description to get the best results.
            </div>
          </div>

          {/* Right Column - Display */}
          <div className="lg:col-span-8">
            <LogoDisplay currentLogo={currentLogo} isLoading={isLoading} />
          </div>
        </div>

        {/* Recent History Section */}
        {history.length > 0 && (
          <div className="mt-20 border-t border-slate-800 pt-10">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-200">
              <History className="w-5 h-5 text-indigo-400" />
              Recent Designs
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {history.map(logo => (
                <button
                  key={logo.id}
                  onClick={() => handleLoadFromHistory(logo)}
                  className={`group relative aspect-square rounded-xl overflow-hidden border transition-all ${
                    currentLogo?.id === logo.id 
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
                      : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <img 
                    src={logo.imageUrl} 
                    alt={logo.data.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <p className="text-white text-xs font-medium truncate">{logo.data.name}</p>
                    <p className="text-slate-400 text-[10px] truncate">{logo.data.style.split(' ')[0]}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;