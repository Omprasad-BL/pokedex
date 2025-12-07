// src/components/PokemonModal.jsx
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { fetchPokemonDetails } from '../api';
import { capitalize, TYPE_COLORS } from '../utils';
import { motion } from 'framer-motion'; // <--- IMPORT

const PokemonModal = ({ pokemonName, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemonDetails(pokemonName).then(data => {
      setDetails(data);
      setLoading(false);
    });
  }, [pokemonName]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    // 1. Overlay Animation
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 2. Modal Card Animation (Slide Up + Fade) */}
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        
        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-800"></div>
          </div>
        ) : (
          <>
            {/* Header Area */}
            <div className={`relative h-40 ${TYPE_COLORS[details.types[0].type.name] || 'bg-gray-500'} flex justify-center items-end`}>
              <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors">
                <X size={24} />
              </button>
              <span className="absolute top-4 left-4 text-6xl font-black text-white/20 select-none">
                #{String(details.id).padStart(3, '0')}
              </span>
              <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="translate-y-12 drop-shadow-2xl"
              >
                 <img src={details.sprites.other['official-artwork'].front_default} alt={details.name} className="w-48 h-48 object-contain" />
              </motion.div>
            </div>

            {/* Body Content */}
            <div className="pt-16 pb-8 px-6 text-center">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{capitalize(details.name)}</h2>
              <div className="flex justify-center gap-2 mb-6">
                {details.types.map(t => (
                  <span key={t.type.name} className={`${TYPE_COLORS[t.type.name]} text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm`}>
                    {t.type.name}
                  </span>
                ))}
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Weight</span>
                    <span className="text-lg font-bold text-gray-700">{details.weight / 10} KG</span>
                 </div>
                 <div className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Height</span>
                    <span className="text-lg font-bold text-gray-700">{details.height / 10} M</span>
                 </div>
              </div>

              {/* Base Stats */}
              <div className="space-y-3 text-left">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Base Stats</h3>
                {details.stats.map((stat, i) => (
                   <motion.div 
                     key={stat.stat.name} 
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.3 + (i * 0.1) }} // Staggered loading
                     className="flex items-center text-sm"
                   >
                     <span className="w-24 font-medium text-gray-500 capitalize truncate">{stat.stat.name.replace('-', ' ')}</span>
                     <span className="w-8 font-bold text-gray-800">{stat.base_stat}</span>
                     <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden ml-2">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                         transition={{ duration: 1, delay: 0.5 }}
                         className={`h-full ${stat.base_stat > 99 ? 'bg-green-500' : stat.base_stat > 50 ? 'bg-blue-500' : 'bg-red-500'}`} 
                       />
                     </div>
                   </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PokemonModal;