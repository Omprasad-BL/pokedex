// src/api.js
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error('Failed to fetch list');
  return response.json();
};

export const fetchPokemonDetails = async (nameOrId) => {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) throw new Error('Pokemon not found');
  return response.json();
};

export const fetchPokemonByType = async (type) => {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  if (!response.ok) throw new Error('Type not found');
  const data = await response.json();
  // Transform to match the structure of the main list
  return data.pokemon.map((p) => p.pokemon);
};

export const fetchTypes = async () => {
    const response = await fetch(`${BASE_URL}/type`);
    return response.json();
}

// NEW: Fetch all pokemon names for "Regex-like" search
export const fetchAllPokemonNames = async () => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=2000`);
  const data = await response.json();
  return data.results; // Returns array of { name, url }
};