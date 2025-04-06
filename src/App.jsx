import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Final from "./pages/Final";
import Inicial from "./pages/Inicial";
import Login from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import ProtectedRoute from "./components/ProtectedRoute"; // Importe o componente de rota protegida

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Inicial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        
        {/* Rotas protegidas */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/final" element={
          <ProtectedRoute>
            <Final />
          </ProtectedRoute>
        } />
        
        {/* Rota 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;