import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import PokemonCard from '../components/PokemonCard';
import PokemonModal from '../components/PokemonModal';
import { useFavorites } from '../context/FavoritesContext';
import { fetchPokemonList, fetchPokemonByType, fetchTypes, fetchAllPokemonNames } from '../api';
import { AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
const Pokedex = () => {
  // --- Favorites Data ---
  const { favorites } = useFavorites();
  
  // --- Data State ---
  const [pokemons, setPokemons] = useState([]);
  const [allPokemonList, setAllPokemonList] = useState([]); 
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // --- Control State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  // --- Filtered List for Search/Type modes ---
  const [filteredList, setFilteredList] = useState([]); 
  const ITEMS_PER_PAGE = 20;

  // 1. Initial Load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [typeList, allList] = await Promise.all([
          fetchTypes(),
          fetchAllPokemonNames()
        ]);
        setTypes(typeList.results);
        setAllPokemonList(allList);
        loadGlobalPage(0);
      } catch (err) {
        console.error("Failed to initialize:", err);
      }
    };
    init();
  }, []);

  // 2. Load Global Page (Main List)
  const loadGlobalPage = async (pageIndex) => {
    setLoading(true);
    try {
      const data = await fetchPokemonList(ITEMS_PER_PAGE, pageIndex * ITEMS_PER_PAGE);
      setPokemons(data.results);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  // 3. Handle Filters with DEBOUNCE (Optimization)
  useEffect(() => {
    // A. Define the logic we want to run
    const filterLogic = () => {
      if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        
        // Step 1: Find matches
        const matches = allPokemonList.filter(p => p.name.includes(lowerTerm));
        
        // Step 2: Smart Sort
        matches.sort((a, b) => {
            const aStarts = a.name.startsWith(lowerTerm);
            const bStarts = b.name.startsWith(lowerTerm);
            if (aStarts && !bStarts) return -1; 
            if (!aStarts && bStarts) return 1;
            return a.name.localeCompare(b.name); 
        });
        
        setFilteredList(matches);
        setPage(0);
        setShowFavorites(false); 
      } 
      else if (selectedType) {
        // ... (Type logic remains the same, usually fast enough without debounce)
        setLoading(true);
        fetchPokemonByType(selectedType).then(list => {
          setFilteredList(list);
          setLoading(false);
          setPage(0);
          setShowFavorites(false);
        });
      } else if (!showFavorites) {
        setFilteredList([]);
        if(pokemons.length === 0) loadGlobalPage(0);
      }
    };

    // B. Set up the Debounce Timer
    // Only debounce if we are SEARCHING (Type filtering is usually instant click)
    const timeoutId = setTimeout(() => {
      filterLogic();
    }, 300); // Wait 300ms after user stops typing

    // C. Cleanup Function (The Magic)
    return () => clearTimeout(timeoutId);

  }, [searchTerm, selectedType, allPokemonList]); // Dependencies

  // --- Handlers ---
  const toggleFavorites = () => {
    if (showFavorites) {
      setShowFavorites(false);
      if(pokemons.length === 0) loadGlobalPage(0);
    } else {
      setSearchTerm('');
      setSelectedType('');
      setShowFavorites(true);
      setPage(0);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setShowFavorites(false);
    setPage(0);
    loadGlobalPage(0);
  };

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Only fetch from API if we are in Global Mode
    if (!searchTerm && !selectedType && !showFavorites) loadGlobalPage(nextPage);
  };

  const handlePrev = () => {
    if (page > 0) {
      const prevPage = page - 1;
      setPage(prevPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Only fetch from API if we are in Global Mode
      if (!searchTerm && !selectedType && !showFavorites) loadGlobalPage(prevPage);
    }
  };

  // --- Determine Display Data ---
  let displayData = pokemons;

  if (showFavorites) {
    displayData = favorites; 
  } 
  else if (searchTerm || selectedType) {
    const start = page * ITEMS_PER_PAGE;
    displayData = filteredList.slice(start, start + ITEMS_PER_PAGE);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans ">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        types={types}
        showFavorites={showFavorites}
        toggleFavorites={toggleFavorites}
        favCount={favorites.length}
      />

      <main className="w-full px-4 py-8 md:px-8">
        
        {/* Results Header */}
        {(searchTerm || selectedType || showFavorites) && (
          <div className="flex justify-between items-center mb-6 max-w-[1920px] mx-auto">
            <h2 className="text-xl font-bold text-gray-700">
              {showFavorites ? "❤️ Your Favorite Pokémon" : 
               searchTerm ? `Results for "${searchTerm}"` : `Type: ${selectedType}`}
              
              {!showFavorites && (
                <span className="ml-2 text-sm text-gray-400 font-normal">
                  ({filteredList.length} found)
                </span>
              )}
            </h2>
            
            <button 
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-gray-700 transition"
            >
              ✕ Clear Filters
            </button>
          </div>
        )}

        {/* Empty State: Favorites */}
        {showFavorites && favorites.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-bold text-gray-700">No Favorites Yet</h3>
            <p className="text-gray-500 mt-2">Click the heart icon on any Pokémon to save it here.</p>
            <button onClick={clearFilters} className="mt-6 text-blue-600 font-bold hover:underline">
              Go back to list
            </button>
          </div>
        )}

        {/* The Grid */}
        {loading ? (
           <div className="flex justify-center p-20">
             <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600"></div>
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 max-w-[1920px] mx-auto">
            {displayData.map((p) => (
              <PokemonCard 
                key={p.name} 
                pokemon={p} 
                onClick={() => setSelectedPokemon(p.name)} 
              />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {!showFavorites && displayData.length > 0 && (
          <Pagination 
             page={page} 
             handlePrev={handlePrev} 
             handleNext={handleNext}
             disableNext={
               (searchTerm || selectedType) 
                 ? (page + 1) * ITEMS_PER_PAGE >= filteredList.length 
                 : displayData.length < ITEMS_PER_PAGE
             }
          />
        )}
      </main>
      
     <AnimatePresence>
        {selectedPokemon && (
          <PokemonModal pokemonName={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
        )}
      </AnimatePresence>
      <Footer/>

    </div>
  );
};
export default Pokedex;