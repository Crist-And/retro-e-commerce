import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación interna

export default function Footer() {
  return (
    <footer className="w-full bg-[#355C7D] text-white p-6 mt-auto shadow-lg">
      <div className="mx-auto w-full max-w-screen-xl py-6 lg:py-8">
        <div className="md:flex md:justify-between md:items-start"> {/* Alineación vertical ajustada */}
          {/* Sección del Logo */}
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start"> {/* Centrado en móvil, izquierda en desktop */}
            <Link to="/" className="flex items-center mb-4"> {/* Enlace del logo al inicio */}
              <img 
                src="https://res.cloudinary.com/du9ywopnu/image/upload/v1750286791/c-dise%C3%B1os_hjozao.webp" 
                className="w-16 h-16 me-3 rounded-full  border-white shadow-md" // Estilo mejorado para el logo
                alt="C - Diseños Logo" 
              />
              <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">C - Diseños</span> {/* Tamaño y peso de fuente mejorados */}
            </Link>
           <p className="text-gray-300 text-base max-w-xs text-center md:text-left">
              Transformamos ideas en experiencias visuales.
            </p>
          </div>

          {/* Secciones de Enlaces */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3 mt-8 md:mt-0"> {/* Aumento del gap */}
            {/* Menú de Navegación */}
            <div>
              <h2 className="mb-6 text-base font-semibold text-gray-100 uppercase">Navegación</h2>
              <ul className="text-gray-300 font-medium space-y-3"> {/* Espaciado mejorado */}
                <li>
                  <Link to="/" className="hover:underline hover:text-white transition-colors duration-200">Inicio</Link>
                </li>
                <li>
                  <Link to="/categorias" className="hover:underline hover:text-white transition-colors duration-200">Categorías</Link>
                </li>
                <li>
                  <Link to="/ofertas" className="hover:underline hover:text-white transition-colors duration-200">Ofertas</Link>
                </li>
                <li>
                  <Link to="/ayuda" className="hover:underline hover:text-white transition-colors duration-200">Ayuda</Link>
                </li>
                <li>
                  <Link to="/carrito" className="hover:underline hover:text-white transition-colors duration-200">Carrito</Link>
                </li>
                <li>
                  <Link to="/perfil" className="hover:underline hover:text-white transition-colors duration-200">Perfil</Link>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h2 className="mb-6 text-base font-semibold text-gray-100 uppercase">Contacto</h2>
              <ul className="text-gray-300 font-medium space-y-3">
                <li>
                  <a href="mailto:cris.c.designs@gmail.com" className="hover:underline hover:text-white transition-colors duration-200">Email: cris.c.designs@gmail.com</a>
                </li>
                <li>
                  <a href="tel:1150376688" className="hover:underline hover:text-white transition-colors duration-200">Teléfono: 11 5037 - 6688</a>
                </li>
                <li>
                  <a href="https://linktr.ee/design_c" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white transition-colors duration-200">Nuestras Redes</a>
                </li>
              </ul>
            </div>

            {/* Legal (ejemplo, puedes añadir más) */}
            <div>
              <h2 className="mb-6 text-base font-semibold text-gray-100 uppercase">Legal</h2>
              <ul className="text-gray-300 font-medium space-y-3">
                <li>
                 {/*<Link to="/privacy-policy" className="hover:underline hover:text-white transition-colors duration-200">Política de Privacidad</Link>*/}
                </li>
                <li>
                  {/*<Link to="/terms-conditions" className="hover:underline hover:text-white transition-colors duration-200">Términos y Condiciones</Link>*/}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-gray-600 sm:mx-auto lg:my-10" /> {/* Línea divisoria más sutil */}
        
        {/* Sección de Derechos de Autor */}
        <div className="flex items-center justify-center flex-col sm:flex-row text-center sm:text-left">
          <span className="text-sm text-gray-400">
            © {new Date().getFullYear()} <a href="https://linktr.ee/design_c" target="_blank" rel="noopener noreferrer" className="hover:underline">C - Diseños</a>. Todos los derechos reservados.
          </span>
          {/* añadir iconos de redes sociales aquí si lo deseas */}
          {/* <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">...</svg>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
