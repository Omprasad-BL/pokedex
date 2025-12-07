// // src/components/Header.jsx
// import React from 'react';
// import { Search, X, Heart, LogIn, LogOut } from 'lucide-react';
// import { capitalize } from '../utils';
// import { useAuth } from '../context/AuthContext';

// export default function Header({ 
//   types, selectedType, setSelectedType, searchTerm, setSearchTerm, 
//   showFavorites, toggleFavorites, favCount 
// }) {
//   const { user, login, logout } = useAuth(); 

//   return (
//     // CHANGE: bg-slate-900 (Dark Professional Theme)
//     <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-40 w-full border-b border-slate-800">
//       <div className="w-full px-4 py-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
//         {/* Logo Area */}
//         <div 
//           className="flex items-center gap-3 w-full md:w-auto cursor-pointer group"
//           onClick={() => window.location.reload()}
//         >
//           {/* A cleaner, simpler logo icon */}
//           <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex-shrink-0 flex items-center justify-center transform group-hover:rotate-12 transition-all">
//              <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
//           </div>
//           <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">
//             Pokedex<span className="font-light text-slate-400">Lite</span>
//           </h1>
//         </div>

//         {/* Controls */}
//         <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          
       

       

//           {/* Search Bar (Dark Mode Style) */}
//           <div className="relative w-full sm:w-64">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
//             {searchTerm && (
//               <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3.5 text-slate-500 hover:text-white transition">
//                 <X size={18} />
//               </button>
//             )}
//           </div>

//           {/* Type Dropdown */}
//           <div className="relative">
//              <select
//               className="w-full sm:w-40 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 cursor-pointer text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
//               value={selectedType}
//               onChange={(e) => { setSelectedType(e.target.value); setSearchTerm(''); }}
//             >
//               <option value="">All Types</option>
//               {types.map((t) => (
//                 <option key={t.name} value={t.name} className="bg-slate-800">{capitalize(t.name)}</option>
//               ))}
//             </select>
//             {/* Custom Arrow because we used appearance-none for style */}
//             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
//               <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
//             </div>
//           </div>

//              {/* Favorites Toggle */}
//           <button 
//             onClick={toggleFavorites}
//             className={`relative flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition border
//               ${showFavorites 
//                 ? 'bg-indigo-600 text-white border-indigo-500 shadow-inner' 
//                 : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
//               }`}
//           >
//             <Heart size={20} className={showFavorites ? "fill-white" : ""} />
//             <span className="hidden sm:inline">Saved</span>
//             {favCount > 0 && (
//               <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-[10px] rounded-full bg-red-500 text-white border-2 border-slate-900">
//                 {favCount}
//               </span>
//             )}
//           </button>

//              {/* User Profile */}
//           {user ? (
//             <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-3 py-1.5 pr-4 border border-slate-700 shadow-sm">
//                {user.photoURL ? (
//                  <img src={user.photoURL} alt="User" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-slate-600" />
//                ) : (
//                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">{user.displayName?.[0]}</div>
//                )}
//                <div className="flex flex-col hidden sm:flex">
//                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Trainer</span>
//                  <span className="text-sm font-bold leading-none text-slate-200">{user.displayName?.split(' ')[0]}</span>
//                </div>
//                <button onClick={logout} className="ml-2 p-1.5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-lg transition-all" title="Logout">
//                  <LogOut size={16} />
//                </button>
//             </div>
//           ) : (
//             <button onClick={login} className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition shadow-lg hover:shadow-indigo-500/25">
//               <LogIn size={18} />
//               <span>Login</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }



// src/components/Header.jsx
import React, { useState } from 'react';
import { Search, X, Heart, LogIn, LogOut, Menu } from 'lucide-react';
import { capitalize } from '../utils';
import { useAuth } from '../context/AuthContext';

export default function Header({ 
  types, selectedType, setSelectedType, searchTerm, setSearchTerm, 
  showFavorites, toggleFavorites, favCount 
}) {
  const { user, login, logout } = useAuth(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-40 w-full border-b border-slate-800">
      
      {/* FIX 1: Added 'md:flex md:items-center md:justify-between' 
         This puts the Logo container and the Nav container on the same row for desktop.
      */}
      <div className="w-full px-4 py-4 md:px-8 md:flex md:items-center md:justify-between">
        
        <div className="flex items-center justify-between w-full md:w-auto">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.location.reload()}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex-shrink-0 flex items-center justify-center transform group-hover:rotate-12 transition-all">
               <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Pokedex<span className="font-light text-slate-400">Lite</span>
            </h1>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* NAV CONTENT */}
        <div className={`
            ${isMenuOpen ? 'flex' : 'hidden'} 
            md:flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 
        `}>
          
          {/* Mobile Divider */}
          <div className="w-full h-px bg-slate-800 md:hidden my-2"></div>

          {/* Controls Group */}
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto items-center">
             
             {/* User Profile */}
             {user ? (
              <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-3 bg-slate-800 rounded-xl px-3 py-2 pr-4 border border-slate-700 shadow-sm">
                 <div className="flex items-center gap-3">
                   {user.photoURL ? (
                     <img src={user.photoURL} alt="User" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-slate-600" />
                   ) : (
                     <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">{user.displayName?.[0]}</div>
                   )}
                   <div className="flex flex-col">
                     {/* <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Trainer</span> */}
                     <span className="text-sm font-bold leading-none text-slate-200">{user.displayName?.split(' ')[0]}</span>
                   </div>
                 </div>
                 <button onClick={logout} className="ml-2 p-1.5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-lg transition-all" title="Logout">
                   <LogOut size={18} />
                 </button>
              </div>
            ) : (
              <button onClick={login} className="w-full md:w-auto flex justify-center items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition shadow-lg">
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}

            {/* Favorites Toggle */}
            <button 
              onClick={() => { toggleFavorites(); setIsMenuOpen(false); }}
              className={`w-full md:w-auto relative flex justify-center items-center gap-2 px-4 py-3 rounded-xl font-bold transition border
                ${showFavorites 
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-inner' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
            >
              <Heart size={20} className={showFavorites ? "fill-white" : ""} />
              <span>Saved</span>
              {favCount > 0 && (
                <span className="absolute top-2 right-4 md:-top-2 md:-right-2 w-5 h-5 flex items-center justify-center text-[10px] rounded-full bg-red-500 text-white border-2 border-slate-900">
                  {favCount}
                </span>
              )}
            </button>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3.5 text-slate-500 hover:text-white transition">
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Type Dropdown */}
            <div className="relative w-full md:w-auto">
               <select
                className="w-full md:w-40 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 cursor-pointer text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={selectedType}
                onChange={(e) => { 
                  setSelectedType(e.target.value); 
                  setSearchTerm('');
                  setIsMenuOpen(false);
                }}
              >
                <option value="">All Types</option>
                {types.map((t) => (
                  <option key={t.name} value={t.name} className="bg-slate-800">{capitalize(t.name)}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </header>
  );
}