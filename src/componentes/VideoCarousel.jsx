import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function VideoCarousel() {
  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("https://68100eb927f2fdac24102bcc.mockapi.io/slide_prod")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos]);

  if (videos.length === 0) return <div className="text-center py-10">Cargando videos...</div>;

  return (
    <div className="relative w-full max-h-[50rem] overflow-hidden">
      {/* Texto y botón */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto text-center w-full px-4"> {/* ✅ CAMBIOS AQUÍ */}
        <h2 className="text-white text-4xl font-poppins font-bold md:text-6xl lg:text-7xl drop-shadow-lg mb-8"> {/* ✅ CAMBIOS AQUÍ */}
          Bienvenidos a la Tienda
        </h2>
        <Link
          to="/categorias"
          className="mt-4 inline-block bg-[#355C7D] hover:bg-[#2C4B5D] text-white text-lg md:text-xl lg:text-2xl font-poppins font-semibold py-3 px-6 rounded-lg shadow-xl transition duration-300 transform hover:scale-105" /* ✅ ESTILOS MEJORADOS */
        >
          Ver Productos
        </Link>
      </div>

      {/* Carrusel de videos */}
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 relative" : "opacity-0 pointer-events-none"
          }`}
        >
          <video
            src={video.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-screen h-[70vh] object-cover"
          />
          {/* ✅ Overlay oscuro para mejorar la legibilidad del texto */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      ))}

    </div>
  );
}
