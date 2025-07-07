import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const categorias = [
  "Fotografia",
  "Vehiculo",
  "Tecnologia Retro",
  "Decoraciones Retro",
  "Juguetes Retro",
  "Iluminacion",
];

export default function Search() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Codifica el término de búsqueda para la URL
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    // Codifica la categoría seleccionada
    const encodedCategory = encodeURIComponent(selectedCategory);

    // Navega a la página de resultados con los parámetros de búsqueda
    navigate(
      `/resultados?search=${encodedSearchTerm}&category=${encodedCategory}`
    );
  };

  return (
    <form className="relative w-full max-w-md flex items-center" onSubmit={handleSubmit}>
      {/* Botón de categoría */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-l-full border border-gray-300 shadow-sm hover:bg-slate-100 transition"
        >
          {selectedCategory}
          <svg
            className="w-3 h-3 text-slate-500"
            fill="none"
            viewBox="0 0 10 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <ul className="absolute z-50 mt-1 left-0 bg-[#355C7D] border border-gray-700 rounded-lg shadow-lg text-sm w-60 overflow-hidden">
            <li>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("Todas");
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#704214] text-white"
              >
                Todas
              </button>
            </li>
            {categorias.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#704214] text-white capitalize"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Campo de búsqueda */}
      <div className="relative flex-grow">
        <input
          type="search"
          placeholder={`Buscar en ${selectedCategory.toLowerCase()}...`}
          className="w-full px-4 py-2 text-sm text-slate-800 bg-white border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm} // Controla el input con el estado
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado al escribir
        />

        {/* Botón lupa */}
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 text-white bg-[#355C7D] hover:bg-[#2c4a5f] transition text-sm font-medium"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}