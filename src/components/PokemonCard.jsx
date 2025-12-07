// src/components/PokemonCard.jsx
import { getPokemonId, capitalize } from '../utils';
import { useFavorites } from '../context/FavoritesContext';
import { Heart } from 'lucide-react';

const PokemonCard = ({ pokemon, onClick }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const id = getPokemonId(pokemon.url);
  const favorite = isFavorite(pokemon.name);
  
  // Using the official artwork for better quality
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div 
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group relative flex flex-col items-center"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(pokemon);
        }}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
      >
        <Heart 
          size={18} 
          className={favorite ? "fill-red-500 text-red-500" : "text-gray-300 group-hover:text-gray-400"} 
        />
      </button>

      <div onClick={() => onClick(pokemon)} className="w-full flex flex-col items-center">
        <div className="bg-gray-50 rounded-full p-4 mb-3 group-hover:bg-blue-50 transition-colors w-full flex justify-center">
            <img 
              src={image} 
              alt={pokemon.name} 
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
        </div>
        <span className="text-gray-400 text-xs font-bold tracking-wider">#{id.padStart(3, '0')}</span>
        <h3 className="text-lg font-bold text-gray-800 mt-1 text-center leading-tight">{capitalize(pokemon.name)}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;