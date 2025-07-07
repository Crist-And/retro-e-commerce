import React, { useEffect } from 'react'; // Importa useEffect
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify'; // Para notificaciones

export default function Checkout() {
  const { cartItems, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const totalCompra = getSubtotal();

  // ✅ CAMBIO AQUÍ: Usa useEffect para la redirección condicional
  useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setTimeout(() => {
        toast.info("Tu carrito está vacío.");
        navigate("/");
      }, 0); // Retrasa la navegación al siguiente tick

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [cartItems, navigate]); // Dependencias: cartItems y navigate

  // Si el carrito está vacío y el useEffect ya disparó la navegación,
  // no renderizamos nada en este componente.
  if (cartItems.length === 0) {
    return null; 
  }

  const handleFinalizar = () => {
    // Aquí iría la lógica real para procesar la compra (ej. enviar a un backend)
    // Por ahora, solo vaciamos el carrito y redirigimos al inicio con un mensaje.
    clearCart();
    toast.success("¡Compra finalizada con éxito! Gracias por tu compra.");
    navigate("/");
  };

  const handleSeguirComprando = () => {
    navigate("/categorias"); // Redirige a la página de categorías
  };

  const handleCancelarCompra = () => {
    clearCart(); // Vacía el carrito al cancelar
    toast.info("Compra cancelada. Tu carrito ha sido vaciado.");
    navigate("/"); // Redirige al inicio
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Finalizar Compra</h1>

      <div className="bg-white rounded-lg shadow-xl p-6 mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-slate-700">Detalle de Productos</h2>
        <div className="space-y-4">
          {cartItems.map(item => {
            const numericPrice = typeof item.price === 'number' ? item.price : (parseFloat(item.price) || 0);
            return (
              <div key={item.id} className="flex items-center border-b pb-2 last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/cccccc/333333?text=No+Image`; }}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-slate-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-semibold text-green-600">${(numericPrice * item.quantity).toFixed(2)}</p>
              </div>
            );
          })}
        </div>
        <div className="text-right mt-6 pt-4 border-t">
          <p className="text-2xl font-bold text-slate-800">
            Total de la Compra: <span className="text-indigo-600">${totalCompra.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
        <button
          onClick={handleFinalizar}
          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold text-lg shadow-lg transition duration-200"
        >
          Aceptar y Finalizar
        </button>
        <button
          onClick={handleSeguirComprando}
          className="flex-1 px-6 py-3 bg-[#355C7D] hover:bg-[#2C4B5D] text-white rounded-md font-semibold text-lg shadow-lg transition duration-200"
        >
          Seguir Comprando
        </button>
        <button
          onClick={handleCancelarCompra}
          className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold text-lg shadow-lg transition duration-200"
        >
          Cancelar Todo
        </button>
      </div>
    </div>
  );
}
