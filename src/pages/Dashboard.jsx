import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { userEmail, userRole } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>¡Bienvenido!</h2>
      <p><strong>Email:</strong> {userEmail}</p>
      <p><strong>Rol:</strong> {userRole}</p>
    </div>
  );
}
