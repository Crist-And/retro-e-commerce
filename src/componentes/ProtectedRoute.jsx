import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify"; // ✅ Importa la función toast

export default function ProtectedRoute({ children, role }) {
  const { userEmail, userRole, loading } = useAuth();

  // Mientras carga el estado de autenticación, mostramos un loader o nada
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-slate-600 font-semibold text-lg">Cargando...</p>
      </div>
    );
  }

  // Si no está logueado, redirigimos a perfil (login) y mostramos un toast
  if (!userEmail) {
    toast.error("Debes iniciar sesión para acceder a esta sección."); // Notificación para usuario no logueado
    return <Navigate to="/perfil" replace />;
  }

  // Si hay rol requerido y el rol del usuario no coincide, redirigimos a home y mostramos un toast
  if (role && userRole !== role) {
    toast.error("No tienes permisos para acceder a esta sección."); // Notificación para rol insuficiente
    return <Navigate to="/perfil" replace />;
  }

  // Si todo está ok, renderizamos el componente protegido
  return children;
}