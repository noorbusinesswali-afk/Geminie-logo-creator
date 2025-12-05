import React from 'react';
import { LogoStyle, LogoFormData } from '../types';
import { Palette, Type, MessageSquare, Briefcase } from 'lucide-react';

interface LogoFormProps {
  formData: LogoFormData;
  setFormData: React.Dispatch<React.SetStateAction<LogoFormData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const LogoForm: React.FC<LogoFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-indigo-400" />
        Brand Details
      </h2>
      
      <div className="space-y-5">
        {/* Brand Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Brand Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Type className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Nexus Dynamics"
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500 transition-all"
            />
          </div>
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Logo Style</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
             {Object.entries(LogoStyle).map(([key, value]) => (
               <button
                 key={key}
                 type="button"
                 onClick={() => setFormData(prev => ({ ...prev, style: value }))}
                 className={`text-xs p-2 rounded-md border transition-all text-center truncate ${
                   formData.style === value
                     ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                     : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                 }`}
               >
                 {value.split(' ')[0]}
               </button>
             ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Color Palette</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Palette className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              placeholder="e.g. Navy Blue and Gold, or Pastel colors"
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500 transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Additional Details</label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-slate-500" />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Include a stylized rocket, evoke a sense of speed..."
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={isLoading || !formData.name}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
            isLoading || !formData.name
              ? 'bg-slate-700 cursor-not-allowed opacity-70'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/25'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Logo...
            </span>
          ) : (
            'Generate Logo'
          )}
        </button>
      </div>
    </div>
  );
};

export default LogoForm;