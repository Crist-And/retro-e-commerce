import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const productos = [
    
  {
    "id": "1",
    "name": "Remera Blanca Stay Groovy",
    "description": "Producto exclusivo: Remera Blanca Stay Groovy. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/remera_blanca_stay_groovy.jpg",
    "price": 1334.51,
    "category": "indumentaria",
    "tags": [
      "retro",
      "noventas",
      "ropa",
      "estampado"
    ],
    "stock": 29,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.639990"
  },
  {
    "id": "2",
    "name": "Remera Negra I Love Retro",
    "description": "Producto exclusivo: Remera Negra I Love Retro. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/remera_negra_i_love_retro.jpg",
    "price": 3027.81,
    "category": "indumentaria",
    "tags": [
      "retro",
      "noventas",
      "ropa",
      "estampado"
    ],
    "stock": 9,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640007"
  },
  {
    "id": "3",
    "name": "Remera Color Nostalgia Pop",
    "description": "Producto exclusivo: Remera Color Nostalgia Pop. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/remera_color_nostalgia_pop.jpg",
    "price": 1342.56,
    "category": "indumentaria",
    "tags": [
      "retro",
      "noventas",
      "ropa",
      "estampado"
    ],
    "stock": 22,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640017"
  },
  {
    "id": "4",
    "name": "Taza Vintage Arcade",
    "description": "Producto exclusivo: Taza Vintage Arcade. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/taza_vintage_arcade.jpg",
    "price": 2060.83,
    "category": "hogar",
    "tags": [
      "retro",
      "noventas",
      "cerámica",
      "hogar"
    ],
    "stock": 20,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.640025"
  },
  {
    "id": "5",
    "name": "Taza Blanca 90s Kid",
    "description": "Producto exclusivo: Taza Blanca 90s Kid. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/taza_blanca_90s_kid.jpg",
    "price": 4418.74,
    "category": "hogar",
    "tags": [
      "retro",
      "noventas",
      "cerámica",
      "hogar"
    ],
    "stock": 15,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.640032"
  },
  {
    "id": "6",
    "name": "Taza Negra Love Pixels",
    "description": "Producto exclusivo: Taza Negra Love Pixels. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/taza_negra_love_pixels.jpg",
    "price": 4241.45,
    "category": "hogar",
    "tags": [
      "retro",
      "noventas",
      "cerámica",
      "hogar"
    ],
    "stock": 10,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640040"
  },
  {
    "id": "7",
    "name": "Tarjeta Cumpleaños Cassette",
    "description": "Producto exclusivo: Tarjeta Cumpleaños Cassette. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/tarjeta_cumpleaños_cassette.jpg",
    "price": 2863,
    "category": "papeleria",
    "tags": [
      "retro",
      "noventas",
      "papelería",
      "saludo"
    ],
    "stock": 6,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640051"
  },
  {
    "id": "8",
    "name": "Tarjeta Saludos VHS",
    "description": "Producto exclusivo: Tarjeta Saludos VHS. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/tarjeta_saludos_vhs.jpg",
    "price": 1406,
    "category": "papeleria",
    "tags": [
      "retro",
      "noventas",
      "papelería",
      "saludo"
    ],
    "stock": 18,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640067"
  },
  {
    "id": "9",
    "name": "Tarjeta Amor Retro",
    "description": "Producto exclusivo: Tarjeta Amor Retro. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/tarjeta_amor_retro.jpg",
    "price": 3425.2,
    "category": "papeleria",
    "tags": [
      "retro",
      "noventas",
      "papelería",
      "saludo"
    ],
    "stock": 18,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.640076"
  },
  {
    "id": "10",
    "name": "Sticker Pack Noventoso",
    "description": "Producto exclusivo: Sticker Pack Noventoso. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/sticker_pack_noventoso.jpg",
    "price": 2759.12,
    "category": "papeleria",
    "tags": [
      "retro",
      "noventas",
      "pegatina",
      "colección"
    ],
    "stock": 22,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640089"
  },
  {
    "id": "11",
    "name": "Sticker Cassette",
    "description": "Producto exclusivo: Sticker Cassette. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/sticker_cassette.jpg",
    "price": 1211.41,
    "category": "papeleria",
    "tags": [
      "retro",
      "noventas",
      "pegatina",
      "colección"
    ],
    "stock": 28,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640099"
  },
  {
    "id": "12",
    "name": "Sticker TV Retro",
    "description": "Producto exclusivo: Sticker TV Retro. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/sticker_tv_retro.jpg",
    "price": 2241.42,
    "category": "papeleria",
    "tags": [
      "retro",
      "noventas",
      "pegatina",
      "colección"
    ],
    "stock": 9,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640110"
  },
  {
    "id": "13",
    "name": "Vinilo Decorativo Stay Groovy",
    "description": "Producto exclusivo: Vinilo Decorativo Stay Groovy. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/vinilo_decorativo_stay_groovy.jpg",
    "price": 4021.43,
    "category": "decoracion",
    "tags": [
      "retro",
      "noventas",
      "pared",
      "adhesivo"
    ],
    "stock": 22,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640121"
  },
  {
    "id": "14",
    "name": "Vinilo Decorativo Game Over",
    "description": "Producto exclusivo: Vinilo Decorativo Game Over. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/vinilo_decorativo_game_over.jpg",
    "price": 3666.67,
    "category": "decoracion",
    "tags": [
      "retro",
      "noventas",
      "pared",
      "adhesivo"
    ],
    "stock": 24,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640129"
  },
  {
    "id": "15",
    "name": "Vinilo Decorativo Chiche Retro",
    "description": "Producto exclusivo: Vinilo Decorativo Chiche Retro. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/vinilo_decorativo_chiche_retro.jpg",
    "price": 4184.34,
    "category": "decoracion",
    "tags": [
      "retro",
      "noventas",
      "pared",
      "adhesivo"
    ],
    "stock": 7,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.640137"
  },
  {
    "id": "16",
    "name": "Cuadro Decorativo Polaroid",
    "description": "Producto exclusivo: Cuadro Decorativo Polaroid. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/cuadro_decorativo_polaroid.jpg",
    "price": 3159.86,
    "category": "decoracion",
    "tags": [
      "retro",
      "noventas",
      "decoración",
      "arte"
    ],
    "stock": 17,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.640150"
  },
  {
    "id": "17",
    "name": "Cuadro Decorativo VHS",
    "description": "Producto exclusivo: Cuadro Decorativo VHS. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/cuadro_decorativo_vhs.jpg",
    "price": 2905.09,
    "category": "decoracion",
    "tags": [
      "retro",
      "noventas",
      "decoración",
      "arte"
    ],
    "stock": 28,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640157"
  },
  {
    "id": "18",
    "name": "Cuadro Decorativo Walkman",
    "description": "Producto exclusivo: Cuadro Decorativo Walkman. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/cuadro_decorativo_walkman.jpg",
    "price": 3105.51,
    "category": "decoracion",
    "tags": [
      "retro",
      "noventas",
      "decoración",
      "arte"
    ],
    "stock": 29,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640164"
  },
  {
    "id": "19",
    "name": "Tote Bag 90s Vibes",
    "description": "Producto exclusivo: Tote Bag 90s Vibes. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/tote_bag_90s_vibes.jpg",
    "price": 2591.56,
    "category": "indumentaria",
    "tags": [
      "retro",
      "noventas",
      "bolso",
      "accesorio"
    ],
    "stock": 6,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.640171"
  },
  {
    "id": "20",
    "name": "Tote Bag Retro Style",
    "description": "Producto exclusivo: Tote Bag Retro Style. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/tote_bag_retro_style.jpg",
    "price": 1964.51,
    "category": "indumentaria",
    "tags": [
      "retro",
      "noventas",
      "bolso",
      "accesorio"
    ],
    "stock": 13,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640178"
  },
  {
    "id": "21",
    "name": "Tote Bag Groovy Mood",
    "description": "Producto exclusivo: Tote Bag Groovy Mood. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/tote_bag_groovy_mood.jpg",
    "price": 3535.52,
    "category": "indumentaria",
    "tags": [
      "retro",
      "noventas",
      "bolso",
      "accesorio"
    ],
    "stock": 24,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640185"
  },
  {
    "id": "22",
    "name": "Mousepad Arcade",
    "description": "Producto exclusivo: Mousepad Arcade. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/mousepad_arcade.jpg",
    "price": 3861.14,
    "category": "hogar",
    "tags": [
      "retro",
      "noventas",
      "pc",
      "oficina"
    ],
    "stock": 25,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640193"
  },
  {
    "id": "23",
    "name": "Mousepad Cassette",
    "description": "Producto exclusivo: Mousepad Cassette. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/mousepad_cassette.jpg",
    "price": 2053.46,
    "category": "hogar",
    "tags": [
      "retro",
      "noventas",
      "pc",
      "oficina"
    ],
    "stock": 6,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.640201"
  },
  {
    "id": "24",
    "name": "Mousepad Chiche Retro",
    "description": "Producto exclusivo: Mousepad Chiche Retro. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/mousepad_chiche_retro.jpg",
    "price": 1633.68,
    "category": "hogar",
    "tags": [
      "retro",
      "noventas",
      "pc",
      "oficina"
    ],
    "stock": 15,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.640209"
  },
  {
    "id": "25",
    "name": "Poster Retro Festival",
    "description": "Producto exclusivo: Poster Retro Festival. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/poster_retro_festival.jpg",
    "price": 3317.34,
    "category": "decoracion",
    "tags": [
      "retro",
      "noventas",
      "pared",
      "afiche"
    ],
    "stock": 29,
    "featured": false,
    "createdAt": "2025-06-09T23:10:11.640217"
  },
  {
    "id": "26",
    "name": "Poster 90s Party",
    "description": "Producto exclusivo: Poster 90s Party. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/poster_90s_party.jpg",
    "price": 2478.18,
    "category": "decoracion",
    "tags": [
      "retro",
      "noventas",
      "pared",
      "afiche"
    ],
    "stock": 20,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640224"
  },
  {
    "id": "27",
    "name": "Poster Teletienda Style",
    "description": "Producto exclusivo: Poster Teletienda Style. Diseño original inspirado en los años 90. ¡Ideal para fans del estilo retro!",
    "image": "https://example.com/images/poster_teletienda_style.jpg",
    "price": 2246.1,
    "category": "decoracion",
    "tags": [
      "retro",
      "noventas",
      "pared",
      "afiche"
    ],
    "stock": 9,
    "featured": true,
    "createdAt": "2025-06-09T23:10:11.640232"
  }
];
productos.forEach(async (producto) => {
  await addDoc(collection(db, "productos"), producto);
});