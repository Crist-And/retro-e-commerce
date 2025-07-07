import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { userEmail, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const isInitialLoad = useRef(true); // Para rastrear la carga inicial

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // ✅ REVISADO: useEffect para cargar los ítems del carrito
  useEffect(() => {
    if (authLoading) {
      return; // Espera a que AuthContext termine de cargar
    }

    if (userEmail) {
      // Si hay un usuario, carga el carrito
      try {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
        console.log("DEBUG: Carrito cargado para usuario:", userEmail, storedCartItems);
      } catch (error) {
        console.error("Error al cargar el carrito desde localStorage:", error);
        setCartItems([]);
      }
    } else {
      // Si no hay usuario, asegura que el carrito esté vacío en la carga inicial o después de cerrar sesión.
      // Solo actualiza el estado si no está ya vacío para evitar re-renders innecesarios.
      if (cartItems.length > 0 || isInitialLoad.current) { // Si hay items O es la carga inicial
        setCartItems([]);
        console.log("DEBUG: No hay usuario logueado, vaciando carrito.");
      } else {
        console.log("DEBUG: No hay usuario logueado, carrito ya está vacío.");
      }
    }
    setLoadingCart(false);
    isInitialLoad.current = false; // Marca la carga inicial como completada
  }, [userEmail, authLoading]); // Dependencias: userEmail, authLoading

  // useEffect para guardar los ítems del carrito
  useEffect(() => {
    if (userEmail && !loadingCart) {
      console.log("DEBUG: Guardando carrito para usuario:", userEmail, cartItems);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else if (!userEmail && !loadingCart) {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems, userEmail, loadingCart]);

  // addItem ahora acepta una cantidad específica
  const addItem = (item, quantityToAdd = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantityToAdd } : i
        );
      }
      return [...prevItems, { ...item, quantity: quantityToAdd }];
    });
  };

  // removeItem (antes removeFromCart)
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // ✅ NUEVO: Función para actualizar la cantidad de un ítem
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) => {
      // Asegúrate de que la nueva cantidad sea al menos 1
      const quantity = Math.max(1, newQuantity); 
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      );
    });
  };

  // Función para calcular el total de ítems
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Función para calcular el subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,     // Exporta removeItem
        updateQuantity, // Exporta updateQuantity
        clearCart,
        loadingCart,
        getTotalItems,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
