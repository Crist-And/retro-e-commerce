import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'; // ✅ Cambiado a FaAngleLeft y FaAngleRight

export default function FeaturedProducts() {
  const [allProducts, setAllProducts] = useState([]); // Almacena todos los productos aleatorios
  const [displayedProducts, setDisplayedProducts] = useState([]); // Los 4 productos que se muestran
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice del primer producto mostrado

  const { addItem } = useCart();
  const { userEmail } = useAuth();
  const isLoggedIn = Boolean(userEmail);

  // Número de productos a mostrar por "página"
  const PRODUCTS_PER_PAGE = 4; 

  useEffect(() => {
    fetch("https://68100eb927f2fdac24102bcc.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => {
        // Baraja todos los productos una vez al cargar
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setAllProducts(shuffled);
        // Muestra los primeros 4 productos
        setDisplayedProducts(shuffled.slice(0, PRODUCTS_PER_PAGE));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  // Efecto para actualizar los productos mostrados cuando cambia el índice
  useEffect(() => {
    const start = currentIndex;
    const end = currentIndex + PRODUCTS_PER_PAGE;
    setDisplayedProducts(allProducts.slice(start, end));
  }, [currentIndex, allProducts]);

  const handleAddToCart = (producto, cantidad) => {
    addItem(producto, cantidad); 
    setProductoSeleccionado(null); // Cierra el modal
  };

  const handleNext = () => {
    // Avanza al siguiente conjunto de productos, si hay más
    if (currentIndex + PRODUCTS_PER_PAGE < allProducts.length) {
      setCurrentIndex(prevIndex => prevIndex + PRODUCTS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    // Retrocede al conjunto anterior de productos, si es posible
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - PRODUCTS_PER_PAGE);
    }
  };

  if (loading) return <p className="mt-4 text-center">Cargando productos destacados...</p>;

  return (
    <section className="w-full max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Productos Destacados</h2>
      
      <div className="relative flex items-center justify-center min-h-[350px]">
        {/* Botón Anterior - ✅ Usamos FaAngleLeft */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed z-10 
                     w-10 h-10 flex items-center justify-center transition-colors duration-200 text-3xl" /* Aumentamos el tamaño del texto para que el icono sea visible */
          aria-label="Anterior"
        >
          <FaAngleLeft /> {/* ✅ Usamos el icono FaAngleLeft */}
        </button>

        {/* Contenedor de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center flex-grow">
          {/* Mapea sobre un array de tamaño fijo para asegurar 4 slots */}
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => {
            const product = displayedProducts[index];
            return product ? (
              <ProductCard
                key={product.id}
                producto={product}
                onClick={() => setProductoSeleccionado(product)}
                ocultarDescripcion={true}
              />
            ) : (
              // Renderiza un div vacío para mantener el espacio si no hay producto
              <div key={`placeholder-${index}`} className="w-full h-[350px] border border-transparent">
                {/* Puedes añadir un spinner o un mensaje aquí si lo deseas */}
              </div>
            );
          })}
        </div>

        {/* Botón Siguiente - ✅ Usamos FaAngleRight */}
        <button
          onClick={handleNext}
          disabled={currentIndex + PRODUCTS_PER_PAGE >= allProducts.length}
          className="absolute right-0 p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed z-10 
                     w-10 h-10 flex items-center justify-center transition-colors duration-200 text-3xl" /* Aumentamos el tamaño del texto para que el icono sea visible */
          aria-label="Siguiente"
        >
          <FaAngleRight /> {/* ✅ Usamos el icono FaAngleRight */}
        </button>
      </div>

      {productoSeleccionado && (
        <ProductModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          isLoggedIn={isLoggedIn}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
}
