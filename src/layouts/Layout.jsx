import React from 'react'; // Ya no necesitamos useEffect aquí
import { Outlet } from "react-router-dom";
import Header from "../componentes/Header";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Ya no necesitamos importar useAuth ni useCart aquí,
// porque la lógica de vaciado se maneja en CartContext directamente.
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';

export default function Layout() {
  // ELIMINADO: Ya no necesitamos obtener estos valores aquí
  // const { userEmail, loading: authLoading } = useAuth();
  // const { clearCart } = useCart();

  // ✅ ELIMINADO: Este useEffect es el que causaba el bucle infinito.
  // La lógica de vaciado del carrito al cerrar sesión se maneja
  // directamente en CartContext cuando userEmail cambia a null.
  // useEffect(() => {
  //   if (!authLoading && userEmail === null) {
  //     console.log("DEBUG: Sesión detectada como cerrada en Layout, vaciando el carrito.");
  //     clearCart();
  //   }
  // }, [userEmail, authLoading, clearCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 min-w-0">
        <aside className="w-20 md:w-32 bg-gray-100 p-2">
          <Navbar />
        </aside>
        <main className="flex-1 p-4 bg-white overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Footer />

      {/* Toasts globales */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
