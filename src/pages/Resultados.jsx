import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from '../componentes/ProductCard';
import ProductModal from '../componentes/ProductModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // ✅ 1. Importa useCart

export default function Resultados() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const { userEmail } = useAuth();
  const isLoggedIn = Boolean(userEmail);

  // ✅ 2. Obtiene la función addItem del contexto (antes addToCart)
  const { addItem } = useCart(); 

  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "Todas";

  // ✅ 3. Modifica handleAddToCart para usar la función addItem real del carrito
  const handleAddToCart = (producto, cantidad) => {
    const cantidadAComprar = cantidad || 1; // Usa la cantidad pasada o 1 por defecto
    // ✅ Llama a addItem con el producto y la cantidad
    addItem(producto, cantidadAComprar); 
    setProductoSeleccionado(null); // Cierra el modal después de agregar
    // Opcional: toast.success('Producto agregado al carrito'); para una notificación más amigable
  };

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://68100eb927f2fdac24102bcc.mockapi.io/productos"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const filteredProducts = data.filter((producto) => {
          const lowerCaseSearchTerm = searchTerm.toLowerCase();

          const matchesName =
            producto.name &&
            producto.name.toLowerCase().includes(lowerCaseSearchTerm);

          const matchesDescription =
            producto.description &&
            producto.description.toLowerCase().includes(lowerCaseSearchTerm);

          const matchesSearch =
            searchTerm === "" || matchesName || matchesDescription;

          const matchesCategory =
            selectedCategory === "Todas" ||
            (producto.categorie &&
              producto.categorie.toLowerCase() ===
                selectedCategory.toLowerCase());

          return matchesSearch && matchesCategory;
        });

        setProductos(filteredProducts);
      } catch (e) {
        setError("Error al cargar los productos: " + e.message);
        console.error("Detalle del error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Cargando resultados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Resultados de búsqueda
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Término buscado: "
        <span className="font-semibold">{searchTerm || "ninguno"}</span>" en
        categoría: "
        <span className="font-semibold">{selectedCategory}</span>"
      </p>

      {productos.length === 0 ? (
        <p className="text-xl text-gray-500">
          No se encontraron productos que coincidan con tu búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onClick={() => setProductoSeleccionado(producto)}
              ocultarDescripcion={true}
            />
          ))}
        </div>
      )}

      {/* Modal de Producto */}
      {productoSeleccionado && (
        <ProductModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          isLoggedIn={isLoggedIn}
          onAddToCart={handleAddToCart} // Ahora este handle llamará al addItem del contexto
        />
      )}
    </div>
  );
}
