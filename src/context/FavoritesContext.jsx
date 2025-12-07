// src/context/FavoritesContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Lazy initialization from localStorage
    const saved = localStorage.getItem('pokedex_favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pokedex_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.name === pokemon.name);
      if (exists) return prev.filter((p) => p.name !== pokemon.name);
      return [...prev, pokemon];
    });
  };

  const isFavorite = (name) => favorites.some((p) => p.name === name);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);