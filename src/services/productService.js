// src/services/productService.js
const API_URL = "https://68100eb927f2fdac24102bcc.mockapi.io/productos";

export const fetchProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener productos");
  return await response.json();
};
