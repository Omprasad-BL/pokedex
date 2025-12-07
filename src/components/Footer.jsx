// src/components/Footer.jsx
import React from 'react';
import { Heart, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Branding */}
        <div className="text-center md:text-left">
          <p className="flex items-center gap-2 text-sm font-medium">
            Made with <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" /> by 
            <span className="text-white font-bold tracking-wide">OmprasadBL</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">© {new Date().getFullYear()} Pokedex Lite. All rights reserved.</p>
        </div>

        {/* Right: Social Links (Optional) */}
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/Omprasad-BL" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a 
            href="https://linkedin.com/in/omprasad-bl" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-2 text-sm"
          >
            <Linkedin size={18} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;