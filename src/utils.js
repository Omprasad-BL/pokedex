// src/utils.js
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getPokemonId = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

// Updated with official-ish hex approximations using Tailwind arbitrary values or closest matches
export const TYPE_COLORS = {
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-500',
  ice: 'bg-cyan-300',
  dragon: 'bg-indigo-600',
  dark: 'bg-slate-700',
  fairy: 'bg-pink-300',
  normal: 'bg-gray-400',
  fighting: 'bg-red-700',
  flying: 'bg-indigo-300',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  rock: 'bg-stone-600',
  bug: 'bg-lime-600',
  ghost: 'bg-purple-700',
  steel: 'bg-zinc-400',
};

// Helper for the background pill of the type
export const TYPE_BG = {
    // We can reuse TYPE_COLORS for simple backgrounds, 
    // or create specific lighter shades if needed.
    // For now, we will use the same map.
};