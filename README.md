Retro E-commerce
¡Bienvenido al repositorio de Retro E-commerce! Este proyecto es una aplicación web de comercio electrónico construida con React, diseñada para ofrecer una experiencia de compra única de productos con temática retro y vintage.

🚀 Demo en Vivo
Puedes ver la aplicación desplegada en Netlify aquí:
https://retro-e-commerce.netlify.app/

✨ Características Principales
Catálogo de Productos: Explora una variedad de productos retro obtenidos de una API simulada.

Paginación de Productos Destacados: Navega entre los productos destacados con controles de paginación intuitivos.

Filtro por Categorías: Explora productos organizados por categorías temáticas.

Búsqueda de Productos: Encuentra productos específicos utilizando la barra de búsqueda.

Modal de Producto: Visualiza detalles completos de cada producto, selecciona la cantidad y añádelo al carrito.

Carrito de Compras:

Añade, elimina y actualiza la cantidad de productos en tu carrito.

Visualiza el subtotal y el total de tu compra.

Vacía el carrito completamente.

Proceso de Checkout:

Página dedicada para finalizar la compra con un resumen de los productos y el total.

Opciones para "Aceptar y Finalizar", "Seguir Comprando" o "Cancelar Todo".

Autenticación de Usuarios:

Inicio de sesión y cierre de sesión.

Roles de usuario (user y admin) para acceso a rutas protegidas.

Cierre de sesión automático por inactividad.

Los datos de sesión persisten en sessionStorage.

Usuarios de Prueba:

Admin: admin@cdisenios.com / admin123

Usuario: user@cdisenios.com / user123

Páginas Informativas:

"Ofertas" (Próximamente)

"Favoritos" (En Construcción)

"Ayuda" con un formulario de contacto integrado con Formspree.

Navegación Intuitiva: Menú de navegación lateral y un footer completo con enlaces útiles.

Diseño Responsivo: La interfaz se adapta perfectamente a dispositivos móviles, tabletas y de escritorio.

Desplazamiento Suave: Al navegar entre páginas, la vista se desplaza automáticamente al inicio de la página.

Notificaciones: Uso de react-toastify para mensajes de usuario amigables.

🛠️ Tecnologías Utilizadas
React: Biblioteca de JavaScript para construir interfaces de usuario.

React Router DOM: Para la navegación y el enrutamiento declarativo.

Tailwind CSS: Framework CSS utility-first para un diseño rápido y responsivo.

React Icons: Colección de iconos populares para React.

React Toastify: Para notificaciones "toast" personalizables.

Formspree: Servicio para manejar envíos de formularios sin necesidad de un backend.

MockAPI: API simulada para la gestión de productos.

⚙️ Instalación y Configuración Local
Sigue estos pasos para tener una copia del proyecto ejecutándose en tu máquina local:

Clonar el Repositorio:

git clone <URL_DEL_TU_REPOSITORIO_GITHUB>
cd retro-e-commerce

(Reemplaza <URL_DEL_TU_REPOSITORIO_GITHUB> con la URL de tu repositorio de GitHub una vez que lo subas)

Instalar Dependencias:

npm install
# o
yarn install

Configurar Formspree:

Ve a Formspree.io y crea una cuenta.

Crea un nuevo formulario y copia el "Endpoint" (URL) que te proporcionan.

Abre src/pages/Ayuda.jsx y reemplaza YOUR_FORMSPREE_FORM_ID en la URL de fetch con tu ID de Formspree:

// Antes:
const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_FORM_ID", { /* ... */ });
// Después (ejemplo):
const response = await fetch("https://formspree.io/f/xyzwabcd", { /* ... */ });

Iniciar la Aplicación:

npm start
# o
yarn start

La aplicación se abrirá en tu navegador en http://localhost:3000 (o un puerto similar).

🚀 Despliegue
Este proyecto está configurado para un despliegue sencillo en plataformas como Netlify.

Conectar a Netlify:

Inicia sesión en tu cuenta de Netlify.

Haz clic en "Add new site" y luego en "Import an existing project".

Conecta con tu proveedor de Git (GitHub, GitLab, Bitbucket).

Selecciona el repositorio de tu proyecto.

Configura las opciones de despliegue:

Build command: npm run build o yarn build

Publish directory: build

Haz clic en "Deploy site".

Netlify construirá y desplegará automáticamente tu aplicación cada vez que hagas un push a la rama principal (generalmente main o master).

🤝 Contribuciones
Las contribuciones, informes de errores y sugerencias son bienvenidas. Por favor, abre un "issue" o envía un "pull request".

📄 Licencia
Este proyecto está bajo la licencia MIT.

✉️ Contacto
Para cualquier consulta, puedes contactar a:
C - Diseños
cris.c.designs@gmail.com
WhatsApp: +54 9 11 5037-6688
Nuestras Redes