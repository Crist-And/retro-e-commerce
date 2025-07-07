// AuthContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
// import { useCart } from "./CartContext"; // ELIMINADO: AuthContext ya no importa useCart

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const inactivityTimer = useRef(null);

  // const { clearCart } = useCart(); // ELIMINADO: Ya no se usa aquí

  const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutos

  // MODIFICADO: La función logout ya NO vacía el carrito directamente
  const logout = (reason = null) => {
    setUserEmail(null);
    setUserRole(null);
    sessionStorage.clear();
    // clearCart(); // ELIMINADO: Esta línea se moverá a otro lugar
    if (reason) toast.info(reason);
  };

  // Cargar sesión desde sessionStorage al montar el componente
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    const storedRole = sessionStorage.getItem("userRole");

    if (storedEmail) setUserEmail(storedEmail);
    if (storedRole) setUserRole(storedRole);

    setLoading(false);
  }, []);

  // Guardar sesión en sessionStorage
  useEffect(() => {
    if (userEmail) {
      sessionStorage.setItem("userEmail", userEmail);
    } else {
      sessionStorage.removeItem("userEmail");
    }

    if (userRole) {
      sessionStorage.setItem("userRole", userRole);
    } else {
      sessionStorage.removeItem("userRole");
    }
  }, [userEmail, userRole]);

  // Temporizador de inactividad
  useEffect(() => {
    // Si no hay email de usuario, no hay sesión para monitorear
    if (!userEmail) {
      // Si el temporizador está activo, límpialo cuando no haya usuario
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
        inactivityTimer.current = null;
      }
      return;
    }

    const resetTimer = () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        logout("Sesión cerrada por inactividad");
      }, INACTIVITY_LIMIT);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // Inicia el temporizador al montar o cuando userEmail cambia a un valor

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [userEmail, logout]); // logout está en las dependencias para evitar warnings de ESLint

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        setUserEmail,
        userRole,
        setUserRole,
        loading,
        logout, // La función logout ahora solo maneja la sesión
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
