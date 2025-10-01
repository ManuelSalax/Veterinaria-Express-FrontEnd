import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(storedUser);
  }, []);

  // Función para actualizar usuario al hacer login
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(storedUser);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-500 text-white p-2 flex justify-between items-center shadow-lg">
        <h1 className="font-bold text-2xl">Veterinaria Salud+</h1>
        <nav>
          {usuario ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold">Hola, {usuario.nombre}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/registro"
                className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="p-8 max-w-5xl mx-auto">
        <Outlet context={{ onLogin: handleLogin }} />
      </main>
    </div>
  );
};

export default MainLayout;
