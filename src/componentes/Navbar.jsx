import { useState} from "react";
import { Link, useLocation} from "react-router-dom";
import {
  FaHome, FaTags, FaShoppingCart, FaUser,
  FaHeart, FaPercentage, FaQuestionCircle, FaCogs, FaBars, FaTimes
} from "react-icons/fa";

const navItems = [
  { label: "Inicio", path: "/", icon: <FaHome />},
  { label: "Categorías", path: "/categorias", icon: <FaTags />},
  { label: "Ofertas", path: "/ofertas", icon: <FaPercentage />},
  { label: "Favoritos", path: "/favoritos", icon: <FaHeart />},
  { label: "Carrito", path: "/carrito", icon: <FaShoppingCart />},
  { label: "Perfil", path: "/perfil", icon: <FaUser />},
  { label: "Ayuda", path: "/ayuda", icon: <FaQuestionCircle />},
  { label: "Config", path: "/configuracion", icon: <FaCogs />},
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Botón hamburguesa visible solo en móviles */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-[#355C7D]">
          {isOpen? <FaTimes />: <FaBars />}
        </button>
      </div>

      {/* Menú de navegación */}
      <div className={`flex flex-col w-full transition-all duration-300
        ${isOpen? "block": "hidden"} md:flex`}>
        {navItems.map(({ label, path, icon}) => (
          <NavItem
            key={label}
            icon={icon}
            label={label}
            path={path}
            active={location.pathname === path}
            onClick={() => setIsOpen(false)} // Cierra menú al hacer clic
          />
))}
      </div>
    </div>
);
};

const NavItem = ({ icon, label, path, active, onClick}) => {
  return (
    <Link to={path} onClick={onClick} className="w-full">
      <div
        className={`w-full h-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-200
          ${active? "bg-[#355C7D] text-white": "text-[#355C7D] hover:bg-gray-300"}`}
>
        <div className="text-2xl">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
);
};

export default Navbar;
