export default function ProductCard({ producto, onClick, ocultarDescripcion = false }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-center transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-xl border border-gray-200 bg-white ${
        ocultarDescripcion ? "p-4 w-[200px]" : "p-5 w-full"
      }`}
    >
      <div className={`${ocultarDescripcion ? "h-32 mb-3" : "h-48 mb-4"} w-full overflow-hidden rounded-lg`}>
        <img
          src={producto.image}
          alt={producto.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <h3 className={`font-semibold text-slate-800 ${ocultarDescripcion ? "text-sm mb-1" : "text-lg mb-2"}`}>
        {producto.name}
      </h3>
      {!ocultarDescripcion && (
        <p className="text-gray-500 text-sm mb-2">{producto.description}</p>
      )}
      <p className={`text-indigo-600 font-bold ${ocultarDescripcion ? "text-sm" : "text-base"}`}>
        ${producto.price}
      </p>
    </div>
  );
}
