import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Para notificaciones

export default function Ayuda() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      const response = await fetch("https://formspree.io/f/xblyewpq", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        toast.success("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.");
        setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
      } else {
        setSubmitError(true);
        toast.error("Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitError(true);
      toast.error("Hubo un error de conexión. Por favor, verifica tu internet e inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Centro de Ayuda y Contacto</h1>

      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-slate-700">Envianos un Mensaje</h2>
        <p className="text-gray-600 mb-6">
          ¿Tenés alguna pregunta, sugerencia o necesitas ayuda? Completá el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Tu Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Tu Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Tu Mensaje:
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-y"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md font-semibold text-white transition duration-200 ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#355C7D] hover:bg-[#2C4B5D]'
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>

          {submitSuccess && (
            <p className="text-green-600 text-center mt-4">¡Tu mensaje ha sido enviado con éxito!</p>
          )}
          {submitError && (
            <p className="text-red-600 text-center mt-4">Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.</p>
          )}
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6 mt-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-slate-700">Información de Contacto Adicional</h2>
        <p className="text-gray-700 mb-2">
          Si prefieres, también puedes contactarnos a través de:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Email: <a href="mailto:cris.c.designs@gmail.com" className="text-blue-600 hover:underline">cris.c.designs@gmail.com</a></li>
          <li>Teléfono: <a href="tel:1150376688" className="text-blue-600 hover:underline">11 5037 - 6688</a></li>
          <li>Ubicación: Palermo, Ciudad Autónoma de Buenos Aires, Argentina</li>
        </ul>
      </div>
    </div>
  );
}

