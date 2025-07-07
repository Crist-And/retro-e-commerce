import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Importa toast

export default function ProductModal({ producto, onClose, isLoggedIn, onAddToCart }) {
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad seleccionada
  // const [showNotification, setShowNotification] = useState(false); // Eliminado: ya no se necesita con toast

  // Restablece la cantidad a 1 cada vez que el producto cambia (modal se abre para un nuevo producto)
  useEffect(() => {
    setCantidad(1);
  }, [producto]);

  const handleAgregar = () => {
    if (!isLoggedIn) {
      toast.error("Debes iniciar sesión para agregar productos al carrito."); // ✅ Usando toast
      // setShowNotification(true); // Eliminado: ya no se necesita con toast
      return;
    }
    // Pasa el producto y la cantidad a la función onAddToCart
    onAddToCart(producto, cantidad); 
    toast.success(`${cantidad} x ${producto.name} agregado al carrito!`); // ✅ Usando toast
    // El modal se cierra en handleAddToCart de Categorias/Resultados
  };

  // Función para cerrar la notificación (eliminada ya que toast la maneja)
  // const closeNotification = () => {
  //   setShowNotification(false);
  // };

  if (!producto) return null;

  // Define una URL de imagen por defecto si producto.image no existe
  const imageUrl = producto.image || `https://placehold.co/400x200/cccccc/333333?text=No+Image`;

  // Asegura que producto.price sea un número antes de usar toFixed
  const displayPrice = typeof producto.price === 'number' 
    ? producto.price.toFixed(2) 
    : (parseFloat(producto.price) || 0).toFixed(2); // Intenta parsear, si falla usa 0

  return (
    <div 
      // ✅ CAMBIO AQUÍ: Añadida la clase backdrop-blur-sm para el efecto borroso
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose} // Cierra el modal al hacer clic fuera
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro cierre el modal
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Cerrar"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">{producto.name}</h2>
        <img 
          src={imageUrl} // Usa la URL de imagen (con fallback)
          alt={producto.name} 
          className="w-full h-48 object-cover rounded-md mb-4" 
          // El onError sigue siendo útil para URLs que son válidas pero no cargan (ej. 404)
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x200/cccccc/333333?text=Error+Loading+Image`; }}
        />
        <p className="text-gray-700 mb-2">{producto.description}</p>
        {/* Usa displayPrice aquí */}
        <p className="text-xl font-semibold text-green-600 mb-4 text-center">${displayPrice}</p>

        {/* Selector de Cantidad */}
        <div className="flex items-center justify-center mb-4">
          <label htmlFor="cantidad" className="mr-2 font-medium">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
            className="w-20 p-2 border border-gray-300 rounded-md text-center"
          />
        </div>

        <button 
          onClick={handleAgregar}
          className={`w-full py-2 px-4 rounded-md font-semibold transition duration-200 
            ${isLoggedIn ? 'bg-[#355C7D] hover:bg-[#2C4B5D] text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
          disabled={!isLoggedIn}
        >
          {isLoggedIn ? 'Agregar al Carrito' : 'Inicia sesión para agregar'}
        </button>

        
      </div>
    </div>
  );
}
