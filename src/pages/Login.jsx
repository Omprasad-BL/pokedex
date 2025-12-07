// src/pages/Login.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const { user, login } = useAuth();

  if (user) return <Navigate to="/pokedex" replace />;

  return (
    // CHANGE: from red gradient to "Deep Slate/Indigo"
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex flex-col items-center justify-center p-4 text-white overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center max-w-md w-full bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl"
      >
        {/* Animated Icon */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-b from-indigo-500 to-white rounded-full border-8 border-slate-800 relative shadow-xl"
        >
          <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-800 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white border-4 border-slate-800 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>

        <h1 className="text-5xl font-black mb-2 tracking-tight text-white">Pokedex Lite</h1>
        <p className="text-slate-300 text-lg mb-8 font-medium">Your ultimate companion for catching 'em all.</p>

        <button 
          onClick={login}
          className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-50 transform hover:scale-105 transition-all flex items-center justify-center gap-3 group"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
          <span>Sign in with Google</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Login;