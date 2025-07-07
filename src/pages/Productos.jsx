import { useEffect, useState } from "react";
import ProductCard from "../componentes/ProductCard"; // Ajustá la ruta si es necesario

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://68100eb927f2fdac24102bcc.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full max-w-[80%] mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
      <h1 className="w-full p-4 text-center text-4xl font-extrabold mb-6">
        Todos los Productos
      </h1>
      {loading ? (
        <p className="mt-8 text-gray-700">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Productos;
