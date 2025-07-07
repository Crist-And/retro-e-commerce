import { useEffect, useState } from "react";

const API_URL = "https://68100eb927f2fdac24102bcc.mockapi.io/productos";

export default function Configuracion() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ name: "", price: "", categorie: "", image: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const categoriasDisponibles = [
  "Fotografia",
  "Vehiculo",
  "Tecnologia Retro",
  "Decoraciones Retro",
  "Juguetes Retro",
  "Iluminacion",
  ];

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const agregarProducto = async () => {
    if (!nuevo.name || !nuevo.price || !nuevo.categorie || !nuevo.image) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });

    if (res.ok) {
      setNuevo({ name: "", price: "", categorie: "", image: "" });
      fetchProductos();
    }
  };

  const eliminarProducto = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProductos();
  };

  const guardarEdicion = async () => {
    await fetch(`${API_URL}/${editandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });
    setNuevo({ name: "", price: "", categorie: "", image: "" });
    setEditandoId(null);
    fetchProductos();
  };

  const editarProducto = (producto) => {
    setNuevo({
      name: producto.name,
      price: producto.price,
      categorie: producto.categorie || "",
      image: producto.image || "",
    });
    setEditandoId(producto.id);
  };

  const productosFiltrados =
    filtroCategoria === ""
      ? []
      : productos.filter((p) => p.categorie === filtroCategoria);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-slate-800 border-b pb-2">
        Gestión de Productos
      </h2>

      {/* Filtro por categoría */}
      <div className="mb-8">
        <label className="block text-base font-semibold mb-2 text-slate-700">
          Filtrar por categoría:
        </label>
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full sm:w-1/2 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
        >
          <option value="">Seleccionar categoría</option>
          {categoriasDisponibles.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Formulario */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevo.name}
          onChange={(e) => setNuevo({ ...nuevo, name: e.target.value })}
          className="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-slate-800 focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevo.price}
          onChange={(e) => setNuevo({ ...nuevo, price: e.target.value })}
          className="w-32 p-3 border border-gray-300 rounded-md bg-gray-50 text-slate-800 focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={nuevo.categorie}
          onChange={(e) => setNuevo({ ...nuevo, categorie: e.target.value })}
          className="p-3 border border-gray-300 rounded-md bg-gray-50 text-slate-800 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Categoría</option>
          {categoriasDisponibles.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="URL imagen"
          value={nuevo.image}
          onChange={(e) => setNuevo({ ...nuevo, image: e.target.value })}
          className="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-slate-800 focus:ring-2 focus:ring-indigo-500"
        />
        {editandoId ? (
          <button
            onClick={guardarEdicion}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={agregarProducto}
            className="bg-[#355C7D] hover:bg-[#2c4a5f] text-white font-semibold px-4 py-2 rounded-md shadow-sm transition"
          >
            Agregar
          </button>
        )}
      </div>

      {/* Tabla de productos */}
      {loading ? (
        <p className="text-gray-700">Cargando productos...</p>
      ) : filtroCategoria === "" ? (
        <p className="text-gray-600 italic">
          Seleccioná una categoría para ver los productos.
        </p>
      ) : productosFiltrados.length === 0 ? (
        <p className="text-gray-600 italic">No hay productos en esta categoría.</p>
      ) : (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-gray-300 rounded-md shadow-sm">
          <table className="w-full border-collapse text-sm text-slate-700">
            <thead className="bg-[#355C7D] text-white sticky top-0 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-3 text-left font-semibold">Imagen</th>
                <th className="p-3 text-left font-semibold">Nombre</th>
                <th className="p-3 text-left font-semibold">Precio</th>
                <th className="p-3 text-left font-semibold">Categoría</th>
                <th className="p-3 text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {productosFiltrados.map((producto) => (
                <tr key={producto.id} className="border-t hover:bg-slate-50">
                  <td className="p-3">
                    <img
                      src={producto.image}
                      alt={producto.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{producto.name}</td>
                  <td className="p-3">${producto.price}</td>
                  <td className="p-3">{producto.categorie}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-x-6">
                      <button
                        onClick={() => editarProducto(producto)}
                        className="text-yellow-600 hover:text-yellow-800 font-medium transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarProducto(producto.id)}
                        className="text-red-600 hover:text-red-800 font-medium transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
