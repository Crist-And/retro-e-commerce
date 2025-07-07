import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Este componente se encarga de desplazar la ventana al inicio
// cada vez que la ruta cambia.
export default function ScrollToTop() {
  const { pathname } = useLocation(); // Obtiene la ruta actual

  useEffect(() => {
    // Desplaza la ventana al inicio (top-left) cuando el pathname cambia
    window.scrollTo(0, 0);
  }, [pathname]); // Se ejecuta cada vez que el pathname cambia

  return null; // Este componente no renderiza nada visible
}
