import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { userEmail, userRole, loading } = useAuth();

  // Esperamos a que se cargue el estado desde localStorage
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-slate-600 font-semibold text-lg">Cargando...</p>
      </div>
    );
  }

  // Si no está logueado, lo redirigimos
  if (!userEmail) {
    return <Navigate to="/perfil" />;
  }

  // Si hay restricción de rol y el usuario no cumple, lo redirigimos
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  // Si está todo bien, renderizamos el contenido
  return children;
}
