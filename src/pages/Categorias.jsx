import { useEffect, useState } from "react";
import {
  FaCamera,
  FaCar,
  FaTv,
  FaCouch,
  FaGamepad,
  FaLightbulb,
  FaTools,
} from "react-icons/fa";
import ProductCard from "../componentes/ProductCard";
import ProductModal from "../componentes/ProductModal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const iconos = {
  Fotografia: <FaCamera size={36} />,
  Vehiculo: <FaCar size={36} />,
  "Tecnologia Retro": <FaTv size={36} />,
  "Decoraciones Retro": <FaCouch size={36} />,
  "Juguetes Retro": <FaGamepad size={36} />,
  Iluminacion: <FaLightbulb size={36} />,
};

export default function Categorias() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const { userEmail } = useAuth();
  const { addItem } = useCart(); // Desestructura 'addItem'
  const isLoggedIn = Boolean(userEmail);

  useEffect(() => {
    fetch("https://68100eb927f2fdac24102bcc.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        const unicas = Array.from(new Set(data.map((p) => p.categorie)));
        setCategorias(unicas);
      });
  }, []);

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((p) => p.categorie === categoriaSeleccionada)
    : [];

  const handleAddToCart = (producto, cantidad) => {
    // ✅ CAMBIO AQUÍ: Llama a 'addItem' con el producto y la cantidad
    addItem(producto, cantidad); 
    setProductoSeleccionado(null); // Cierra el modal
  };

  return (
    <section className="w-full py-4 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-slate-800">Categorías</h1>

      {/* Botones de categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`flex flex-col items-center justify-center w-32 h-24 rounded-xl shadow-md transition duration-200 cursor-pointer 
              ${categoriaSeleccionada === cat ? "bg-[#704214] text-white" : "bg-[#355C7D] text-white hover:bg-[#123456]"}`}
            title={cat}
          >
            {iconos[cat] || <FaTools size={36} />}
            <p className="text-sm mt-2 text-center capitalize">{cat}</p>
          </button>
        ))}
      </div>

      {/* Mensaje cuando no hay categoría seleccionada */}
      {!categoriaSeleccionada && (
        <div className="w-full py-4 px-4 text-center text-slate-600">
          <p className="text-xl">Seleccioná una categoría para ver los productos.</p>
        </div>
      )}

      {/* Sección de productos filtrados */}
      {categoriaSeleccionada && (
        <div className="w-full bg-gray-50">
          {/* Mini-header */}
          <div className="w-full bg-[#355C7D] h-14 flex rounded-t-lg items-center justify-center px-4 shadow-md relative ">
            <h2 className="text-2xl font-poppins font-bold text-white capitalize">
              {categoriaSeleccionada}
            </h2>
          </div>

          {/* Contenido de productos */}
          <div className="w-full py-6 px-4">
            {productosFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {productosFiltrados.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    onClick={() => setProductoSeleccionado(producto)}
                    ocultarDescripcion={true}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-4">
                No hay productos en esta categoría.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {productoSeleccionado && (
        <ProductModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          isLoggedIn={isLoggedIn}
          onAddToCart={handleAddToCart} // Pasa la función handleAddToCart
        />
      )}
    </section>
  );
}
