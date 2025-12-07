// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Login from './pages/Login';
import Pokedex from './pages/Pokedex';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            {/* Public Login Page */}
            <Route path="/" element={<Login />} />

            {/* Protected Pokedex Page */}
            <Route 
              path="/pokedex" 
              element={
                <ProtectedRoute>
                  <Pokedex />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all: Redirect unknown URLs to Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;