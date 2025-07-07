import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export default function Carrito() {
  const { cartItems, removeItem, updateQuantity, getTotalItems, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate(); // Inicializa useNavigate

  const total = getSubtotal(); 

  const handleFinalizarCompra = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Añade productos antes de finalizar la compra."); // Podrías usar toast aquí
      return;
    }
    navigate("/checkout"); // Redirige a la página de checkout
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-4 px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Carrito de Compras</h1>
        <p className="text-gray-500">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4 px-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Carrito de Compras</h1>

      {/* Encabezado */}
      <div className="grid grid-cols-[80px_2fr_1fr_1fr_1fr_auto] items-center gap-4 bg-gray-100 px-2 py-3 rounded-md border border-gray-300 text-sm text-slate-700 font-medium mb-2">
        <span className="pl-1">Imagen</span>
        <span>Producto</span>
        <span>Precio</span>
        <span>Cantidad</span>
        <span>Subtotal</span>
        <span className="text-right pr-2">Acciones</span>
      </div>

      {/* Productos */}
      <div className="flex flex-col gap-4">
        {cartItems.map(({ id, name, price, image, quantity }) => {
          const numericPrice = typeof price === 'number' ? price : (parseFloat(price) || 0);
          const itemSubtotal = numericPrice * quantity;

          return (
            <div
              key={id}
              className="grid grid-cols-[80px_2fr_1fr_1fr_1fr_auto] items-center gap-4 bg-white border border-gray-200 rounded-lg shadow-sm px-2 py-3"
            >
              <div className="w-20 h-20 overflow-hidden rounded border flex items-center justify-center">
                <img src={image} alt={name} className="w-full h-full object-cover" 
                     onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/cccccc/333333?text=No+Image`; }}
                />
              </div>
              <div className="text-base font-medium text-slate-800">{name}</div>
              <div className="text-indigo-600 font-bold">${numericPrice.toFixed(2)}</div> 
              <div>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => updateQuantity(id, Number(e.target.value))}
                  className="w-16 border border-gray-300 rounded-md px-2 py-1"
                />
              </div>
              <div className="font-semibold text-slate-700">
                ${itemSubtotal.toFixed(2)} 
              </div>
              <div className="text-right">
                <button
                  onClick={() => removeItem(id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total y Botones de Acción */}
      <div className="text-right mt-8 flex justify-end items-center gap-4">
        <button
          onClick={clearCart}
          // ✅ CLASES MODIFICADAS: Para que tenga el mismo tamaño que "Finalizar Compra"
          className="bg-[#355C7D] hover:bg-[#2C4B5D] text-white px-6 py-2 rounded-md font-semibold text-lg shadow-lg transition duration-200"
        >
          Vaciar Carrito
        </button>
        <p className="text-xl font-bold text-slate-800">
          Total: <span className="text-indigo-600">${total.toFixed(2)}</span>
        </p>
        <button
          onClick={handleFinalizarCompra}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold text-lg shadow-lg transition duration-200"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
