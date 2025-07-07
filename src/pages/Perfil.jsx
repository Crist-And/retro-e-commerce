import { useState } from "react";
// ✅ Importa la función 'logout' directamente de useAuth
import { useAuth } from "../context/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default function Perfil() {
  // ✅ Desestructura 'logout' del useAuth hook
  const { userEmail, userRole, setUserEmail, setUserRole, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const users = {
    "admin@cdisenios.com": { password: "admin123", role: "admin" },
    "user@cdisenios.com": { password: "user123", role: "user" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingrese un email válido");
      return;
    }

    const user = users[email];

    if (!user || user.password !== password) {
      setError("Email o contraseña incorrectos");
      return;
    }

    setUserEmail(email); // Esto actualiza el AuthContext y sessionStorage
    setUserRole(user.role); // Esto actualiza el AuthContext y sessionStorage
    setError(null);
    // No necesitas llamar a toast.success aquí, AuthContext ya lo maneja si lo deseas al iniciar sesión.
  };

  // ✅ ELIMINA handleLogout y usa directamente la función logout del contexto
  // const handleLogout = () => {
  //   setUserEmail(null);
  //   setUserRole(null);
  //   setEmail("");
  //   setPassword("");
  // };

  if (userEmail) {
    return (
      <div
        style={{
          maxWidth: "420px",
          margin: "4rem auto",
          padding: "2rem",
          border: "1px solid #ddd",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            backgroundColor: "#f0f4f8",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            marginInline: "auto", // para asegurar centrado en todos los navegadores
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaUserCircle size={48} color="#0A1F33" />
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#111",
          }}
        >
          ¡Hola, {userRole === "admin" ? "Admin" : "Usuario"}!
        </h2>
        <p style={{ marginBottom: "0.25rem", color: "#555" }}>
          <strong>Email:</strong> {userEmail}
        </p>
        <p style={{ marginBottom: "1.5rem", color: "#555" }}>
          <strong>Rol:</strong> {userRole}
        </p>
        <button
          onClick={() => {
            logout("Has cerrado sesión."); // ✅ Llama a la función 'logout' del contexto
            setEmail(""); // Limpia los campos del formulario de login
            setPassword(""); // Limpia los campos del formulario de login
          }}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "4rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#355C7D",
        }}
      >
        Iniciar sesión
      </h2>

      {/* Email */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "0.5rem 0.75rem",
          backgroundColor: "#fff",
        }}
      >
        <FaUser style={{ marginRight: "0.75rem", color: "#355C7D" }} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "1rem",
            background: "transparent",
          }}
        />
      </div>

      {/* Contraseña */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "0.5rem 0.75rem",
          backgroundColor: "#fff",
        }}
      >
        <FaLock style={{ marginRight: "0.75rem", color: "#355C7D" }} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "1rem",
            background: "transparent",
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <p
          style={{
            color: "red",
            marginBottom: "1rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      {/* Botón */}
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#355C7D",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        Ingresar
      </button>
    </form>
  );
}