import React from 'react';

export default function Favoritos() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] p-4 text-center">
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Favoritos</h1>
      <p className="text-xl text-gray-600 mb-6">
        Esta sección está en construcción. ¡Pronto podrás guardar tus productos favoritos!
      </p>
      <div className="text-6xl text-yellow-500 animate-bounce">
        🚧
      </div>
    </div>
  );
}