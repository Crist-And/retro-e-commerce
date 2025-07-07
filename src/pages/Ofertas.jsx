import React from 'react';

export default function Ofertas() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] p-4 text-center">
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Ofertas</h1>
      <p className="text-xl text-gray-600 mb-6">
        ¡Próximamente! Estamos preparando las mejores ofertas.
      </p>
      <div className="text-6xl text-blue-500 animate-pulse">
        ⏳
      </div>
    </div>
  );
}
