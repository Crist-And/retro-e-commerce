import { Helmet} from 'react-helmet';
import FeaturedProducts from "../componentes/FeaturedProducts";
import VideoCarousel from "../componentes/VideoCarousel";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Inicio | Retro-E-commerce</title>
        <meta
          name="description"
          content="Descubrí productos vintage únicos en Retro-E-commerce. ¡Explorá lo clásico con estilo moderno!"
        />
        <meta
          name="keywords"
          content="retro, vintage, tienda online, e-commerce, nostalgia, productos clásicos"
        />
        <meta name="author" content="C-Diseños" />
        <meta name="theme-color" content="#355C7D" />
        <link rel="canonical" href="https://www.tusitio.com/" />
      </Helmet>

      <div className="flex flex-col items-center px-4 gap-8">
        <div>
          <VideoCarousel />
        </div>

        <div className="w-full">
          <FeaturedProducts />
        </div>
      </div>
    </>
);
}

