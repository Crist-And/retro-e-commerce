import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Ofertas from "./pages/Ofertas";
import Favoritos from "./pages/Favoritos";
import Ayuda from "./pages/Ayuda";
import Configuracion from "./pages/Configuracion";
import Carrito from "./pages/Carrito";
import Categorias from "./pages/Categorias";
import Perfil from "./pages/Perfil";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./componentes/ProtectedRoute";
import Resultados from "./pages/Resultados";
import Checkout from "./pages/Checkout"; // Importa el componente Checkout

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas Públicas */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="ofertas" element={<Ofertas />} />
        <Route path="ayuda" element={<Ayuda />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="resultados" element={<Resultados />} />
        <Route path="checkout" element={<Checkout />} /> {/* Ruta para la página de Checkout */}
        
        {/* Rutas Protegidas: usuario logueado (user o admin) */}
        <Route
          path="carrito"
          element={
            <ProtectedRoute roles={["user", "admin"]}>
              <Carrito />
            </ProtectedRoute>
          }
        />
        <Route
          path="favoritos"
          element={
            <ProtectedRoute roles={["user", "admin"]}>
              <Favoritos />
            </ProtectedRoute>
          }
        />
        
        {/* Rutas Protegidas: solo admin */}
        <Route
          path="configuracion"
          element={
            <ProtectedRoute role="admin">
              <Configuracion />
            </ProtectedRoute>
          }
        />
        
        {/* Ruta Protegida general (cualquier rol logueado) */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
