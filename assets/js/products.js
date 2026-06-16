/* ============================================================
   AJF Estilo Único — Catálogo (datos reales del catálogo de WhatsApp)
   Fuente única de productos. Las páginas se renderizan desde acá.
   Fotos reales del catálogo · precios en ARS.
   ============================================================ */

const WHATSAPP = "5491132904010"; // +54 9 11 3290-4010
const IG = "https://instagram.com/ajestilounico1";

const CATS = [
  { id: "all",         label: "Todo" },
  { id: "jeans",       label: "Jeans" },
  { id: "camisas",     label: "Camisas y chombas" },
  { id: "camperas",    label: "Camperas y sacos" },
  { id: "sweaters",    label: "Sweaters y buzos" },
  { id: "remeras",     label: "Remeras" },
  { id: "pantalones",  label: "Pantalones y bermudas" },
  { id: "accesorios",  label: "Accesorios" },
];

const CAT_LABEL = Object.fromEntries(CATS.map(c => [c.id, c.label]));

// img: foto real del catálogo · note: detalle corto · badge: etiqueta · featured: aparece en la home
const PRODUCTS = [
  { id: "campera-italia",      name: "Campera Italia",            price: 65000, cat: "camperas",   img: "assets/img/catalog/catalog-24.jpg", note: "Importada · doble cierre · beige, negro, blanco y azul", badge: "Nuevo", featured: true },
  { id: "camisa-poplin",       name: "Camisa Poplin Elastizada",  price: 26000, cat: "camisas",    img: "assets/img/catalog/catalog-00.jpg", note: "Art 1267 · blanco, negro, azul y rosa", badge: "", featured: true },
  { id: "jean-cargo",          name: "Jean Cargo",                price: 24700, cat: "jeans",       img: "assets/img/catalog/catalog-40.jpg", note: "Modelo exclusivo · talles 38 al 46", badge: "Nuevo", featured: true },
  { id: "campera-bomber",      name: "Campera Bomber",            price: 52000, cat: "camperas",    img: "assets/img/catalog/catalog-11.jpg", note: "Importada · bolsillo en manga, interno y dos de frente", badge: "", featured: true },
  { id: "sweater-trenza",      name: "Sweater Trenza",            price: 25000, cat: "sweaters",    img: "assets/img/catalog/catalog-27.jpg", note: "Frente trenzado · S al XXL · 6 colores", badge: "", featured: true },
  { id: "remeras-estampadas",  name: "Remeras Estampadas",        price: 9900,  cat: "remeras",     img: "assets/img/catalog/catalog-46.jpg", note: "Algodón 24/1 premium · varios colores · M al XXL", badge: "", featured: true },
  { id: "jean-corte-chino",    name: "Jean Corte Chino",          price: 20450, cat: "jeans",       img: "assets/img/catalog/catalog-02.jpg", note: "Talles 40 al 48 · color azul", badge: "", featured: true },
  { id: "parka",               name: "Parka Importada",           price: 68000, cat: "camperas",    img: "assets/img/catalog/catalog-25.jpg", note: "Peluche interno · capucha · S al XXL", badge: "", featured: true },

  { id: "camisa-manga-larga",  name: "Camisa Manga Larga",        price: 21900, cat: "camisas",     img: "assets/img/catalog/catalog-16.jpg", note: "Otoño/invierno · talles M, L, XL y XXL", badge: "" },
  { id: "chomba-jersey-imp",   name: "Chomba Jersey Importada",   price: 18070, cat: "camisas",     img: "assets/img/catalog/catalog-01.jpg", note: "Talles del S al XL", badge: "" },
  { id: "chomba-micro-pique",  name: "Chomba Micro Pique",        price: 19500, cat: "camisas",     img: "assets/img/catalog/catalog-13.jpg", note: "Algodón · cuello con vivo en contraste", badge: "" },
  { id: "chomba-jersey",       name: "Chomba Jersey",             price: 14050, cat: "camisas",     img: "assets/img/catalog/catalog-52.jpg", note: "Talles del S al XL", badge: "" },

  { id: "jean-baggy-rotura",   name: "Jean Baggy Rotura",         price: 18500, cat: "jeans",       img: "assets/img/catalog/catalog-08.jpg", note: "Denim con roturas", badge: "" },
  { id: "jean-baggy",          name: "Jean Baggy",                price: 18500, cat: "jeans",       img: "assets/img/catalog/catalog-09.jpg", note: "Calce holgado", badge: "" },
  { id: "jean-baggy-liviano",  name: "Jean Baggy Liviano",        price: 18720, cat: "jeans",       img: "assets/img/catalog/catalog-39.jpg", note: "Tela liviana · talles 36 al 42", badge: "" },
  { id: "jean-nevado",         name: "Jean Nevado Oscuro",        price: 18720, cat: "jeans",       img: "assets/img/catalog/catalog-41.jpg", note: "Elastizado · semi chupín · 40 al 50", badge: "" },
  { id: "jean-azul-105",       name: "Jean Azul Art 105",         price: 18720, cat: "jeans",       img: "assets/img/catalog/catalog-42.jpg", note: "Talles 40 al 50 · color azul", badge: "" },
  { id: "jean-semi-recto",     name: "Jean Semi Recto",           price: 18720, cat: "jeans",       img: "assets/img/catalog/catalog-43.jpg", note: "Calidad premium · celeste y satinado", badge: "" },

  { id: "saco-importado",      name: "Saco Importado",            price: 92000, cat: "camperas",    img: "assets/img/catalog/catalog-03.jpg", note: "Gris melange, gris oscuro y negro", badge: "" },
  { id: "saco-pano",          name: "Saco de Paño Importado",     price: 84000, cat: "camperas",    img: "assets/img/catalog/catalog-14.jpg", note: "Paño premium", badge: "" },
  { id: "campera-grecia",      name: "Campera Grecia",            price: 62500, cat: "camperas",    img: "assets/img/catalog/catalog-12.jpg", note: "Importada · mangas tejidas", badge: "" },
  { id: "rompe-vientos",       name: "Campera Rompe Vientos",     price: 24000, cat: "camperas",    img: "assets/img/catalog/catalog-04.jpg", note: "Liviana", badge: "" },
  { id: "bomber-estampada",    name: "Chaqueta Bomber Estampada", price: 20500, cat: "camperas",    img: "assets/img/catalog/catalog-05.jpg", note: "", badge: "" },
  { id: "bomber-lisa",         name: "Chaqueta Bomber Lisa",      price: 19500, cat: "camperas",    img: "assets/img/catalog/catalog-06.jpg", note: "", badge: "" },
  { id: "chaleco-combinado",   name: "Chaleco Combinado",         price: 54500, cat: "camperas",    img: "assets/img/catalog/catalog-22.jpg", note: "Capucha desmontable · S al XXL", badge: "" },
  { id: "chaleco",             name: "Chaleco",                   price: 49500, cat: "camperas",    img: "assets/img/catalog/catalog-23.jpg", note: "Habana y negro · S al XXL", badge: "" },

  { id: "sweater-escote-v",    name: "Sweater Escote V",          price: 26000, cat: "sweaters",    img: "assets/img/catalog/catalog-15.jpg", note: "Bremen y lycra · M, L y XL", badge: "" },
  { id: "sweater-pitucon",     name: "Sweater Pitucón",           price: 24000, cat: "sweaters",    img: "assets/img/catalog/catalog-28.jpg", note: "Con codos · S al XXL", badge: "" },
  { id: "sweater-media-polera",name: "Sweater Media Polera",      price: 23000, cat: "sweaters",    img: "assets/img/catalog/catalog-29.jpg", note: "Beige, marino y marrón", badge: "" },
  { id: "sweater-liso",        name: "Sweater Liso",              price: 23000, cat: "sweaters",    img: "assets/img/catalog/catalog-30.jpg", note: "Negro · S al XXL", badge: "" },
  { id: "buzo-cuello-redondo", name: "Buzo Cuello Redondo",       price: 16900, cat: "sweaters",    img: "assets/img/catalog/catalog-37.jpg", note: "Atemporal · S al XXL", badge: "" },
  { id: "conjunto-jogging",    name: "Conjunto Jogging Deportivo",price: 46800, cat: "sweaters",    img: "assets/img/catalog/catalog-10.jpg", note: "Buzo + pantalón", badge: "" },

  { id: "remera-oversize-dragon", name: "Remera Oversize Dragón", price: 12480, cat: "remeras",     img: "assets/img/catalog/catalog-19.jpg", note: "Estampado DTF", badge: "" },
  { id: "remera-oversize-tokio",  name: "Remera Oversize Tokio",  price: 12480, cat: "remeras",     img: "assets/img/catalog/catalog-21.jpg", note: "Estampado DTF", badge: "" },
  { id: "remera-oversize-dtf",    name: "Remera Oversize Estampada", price: 12480, cat: "remeras",  img: "assets/img/catalog/catalog-26.jpg", note: "Calidad premium · DTF · rojo, blanco y negro", badge: "" },
  { id: "remera-oversize-graphic",name: "Remera Oversize Graphic",price: 12480, cat: "remeras",     img: "assets/img/catalog/catalog-20.jpg", note: "Estampado DTF", badge: "" },
  { id: "remera-basica-grande",   name: "Remera Básica Talle Grande", price: 11000, cat: "remeras", img: "assets/img/catalog/catalog-48.jpg", note: "XXL al 5XL · negro", badge: "" },
  { id: "remera-playera",         name: "Remera Playera",         price: 7250,  cat: "remeras",     img: "assets/img/catalog/catalog-49.jpg", note: "Blanca y celeste · M al XXL", badge: "Oferta" },
  { id: "remera-basica",          name: "Remera Básica",          price: 9600,  cat: "remeras",     img: "assets/img/catalog/catalog-50.jpg", note: "Algodón peinado 24/1 · ideal para personalizar", badge: "" },

  { id: "tri-cargo",           name: "Pantalón Tri Cargo",        price: 24500, cat: "pantalones",  img: "assets/img/catalog/catalog-07.jpg", note: "Beige, negro y verde oscuro", badge: "" },
  { id: "gabardina-especial",  name: "Pantalón Gabardina Especial", price: 34450, cat: "pantalones",img: "assets/img/catalog/catalog-31.jpg", note: "Art 5036 · talles 50 al 56", badge: "" },
  { id: "cargo-gab-especial",  name: "Cargo Gabardina Especial",  price: 25850, cat: "pantalones",  img: "assets/img/catalog/catalog-44.jpg", note: "Tela rígida · talles 50 al 54", badge: "" },
  { id: "cargo-gabardina",     name: "Cargo Gabardina",           price: 23250, cat: "pantalones",  img: "assets/img/catalog/catalog-45.jpg", note: "Recto · elastizada · 38 al 46", badge: "" },
  { id: "bermuda-cargo",       name: "Bermuda Cargo",             price: 16900, cat: "pantalones",  img: "assets/img/catalog/catalog-34.jpg", note: "Elastizada · talles 40 al 50", badge: "" },
  { id: "bermuda-celeste",     name: "Bermuda Celeste",           price: 14300, cat: "pantalones",  img: "assets/img/catalog/catalog-35.jpg", note: "Rígido · con dobladillo · 40 al 50", badge: "" },
  { id: "bermuda-oversize",    name: "Bermuda Oversize",          price: 14300, cat: "pantalones",  img: "assets/img/catalog/catalog-36.jpg", note: "Tela rígida · 40 al 48", badge: "" },
  { id: "shorts-rustico",      name: "Shorts Rústico",            price: 9360,  cat: "pantalones",  img: "assets/img/catalog/catalog-47.jpg", note: "Algodón rústico · varios colores", badge: "Oferta" },

  { id: "botinero",            name: "Botinero",                  price: 19500, cat: "accesorios",  img: "assets/img/catalog/catalog-17.jpg", note: "Bolso deportivo", badge: "" },
  { id: "morral",             name: "Morral Grande",              price: 19500, cat: "accesorios",  img: "assets/img/catalog/catalog-18.jpg", note: "Amplio y resistente", badge: "" },
];

const byId = id => PRODUCTS.find(p => p.id === id);
