import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";


interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "Google Pixel 8",
    price: 949,
    description: "Experience the power of Google AI with the Pixel 8. Featuring a 6.2-inch Actua display, the Tensor G3 chip, and advanced camera capabilities, it's designed for seamless performance and stunning photography.",
    image: "https://lh3.googleusercontent.com/7q2BTZbqQn2jz_Vmn4yxPbvVGNZ8C9UoT1LZdgDu1b_mgTzr-gcm92YwP3Y-pjouIvYoD4wZiIa_z8hs4slp60efn2f1fTYUnAQ=s3000-w3000-e365-rw-v0",
    stock: 10,
    categoryId: 1
  },
  {
    name: "Google Pixel 8 Pro",
    price: 999,
    description: "The ultimate Google smartphone. With a 6.7-inch Super Actua display, pro-level camera features, and AI-driven enhancements, the Pixel 8 Pro delivers top-tier performance and innovation.",
    image: "https://lh3.googleusercontent.com/H52ocLTvwrVH7DObezbgAFeQBGH66oS3VxPWFSUgBQ_wLpYxcyb0Z23Nej3Wpit13ZrS9xnLz4uAvTPEFElSIToIK2spa6Csk08=s3000-w3000-e365-rw-v0",
    stock: 10,
    categoryId: 1
  },
  {
    name: "Google Pixel Watch 2",
    price: 349,
    description: "Stay connected and track your health with the Pixel Watch 2. Featuring a sleek design, Fitbit integration, and all-day battery life, it's the perfect smartwatch for your daily routine.",
    image: "https://lh3.googleusercontent.com/0Uf8li4u4_l8XgHfEJ7lQwSD-_tCdxyT66IvDb0H1B8JZwIdAzTKZoQExc728iNUCej-YzJ9nAgLPqaGZKhOUCejzMWlKnjkFhU=s3000-w3000-e365-rw-v0",
    stock: 10,
    categoryId: 4
  },
  {
    name: "Google Pixel Buds Pro 2",
    price: 299,
    description: "Immerse yourself in rich, high-quality sound with Pixel Buds Pro. Featuring active noise cancellation, spatial audio, and seamless Google Assistant integration, they redefine wireless audio.",
    image: "https://lh3.googleusercontent.com/Gs4fWm1-Cz73vmWxvfwzd2s4rDE9NVjN-Qx_oYekPpa5bkop0UyKxvcuJM80MDWfNRlwk97ogs6mAtPCofCNxToFexl5Py0lUlk7=s3000-w3000-e365-rw-v0",
    stock: 10,
    categoryId: 4
  },
  {
    name: "Google Nest Hub Mini(2nd Gen)",
    price: 99,
    description: "Control your smart home with the Google Nest Hub. With a 7-inch display, Google Assistant, and sleep tracking, it’s the perfect hub for any home.",
    image: "https://lh3.googleusercontent.com/JYU6DJz9aiVanPNGsCiPDV-IITq3QZD1ujbv4FdfwcSywz9GDHfh5SgEElBf8KYR-V4=w512",
    stock: 10,
    categoryId: 3
  },
  {
    name: "Google Nest Audio",
    price: 129,
    description: "Fill your space with high-quality sound using the Nest Audio. With rich bass and crystal-clear vocals, it’s the ultimate smart speaker for music lovers.",
    image: "https://lh3.googleusercontent.com/pDwk1r_vnh4cCGC0rwVspeYV6OxmPImq6aVTq4-zKfSWSO1wf_klZl3OhqBji09AmCob_dJMUuSVEW2vbAJD",
    stock: 10,
    categoryId: 3
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1199,
    description: "Samsung's flagship phone with a 200MP camera, S Pen support, and a stunning 6.8-inch AMOLED display.",
    image: "https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/179/17987/17987943.jpeg",
    stock: 15,
    categoryId: 1
  },
  {
    name: "iPhone 15 Pro Max",
    price: 1299,
    description: "The iPhone 15 Pro Max boasts a titanium frame, A17 Pro chip, and next-gen camera system for unmatched performance.",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-green_AV1?wid=5120&hei=2880&fmt=webp&qlt=70&.v=cHJOTXEwTU92OEtKVDV2cVB1R2FTSjlERndlRTljaUdZeHJGM3dlLzR2K08zd1NhK011djFkR2k0MHVHWWxwbjhLcXQxZ1h0QThIT2dnUm5qbGk5OUJkSERIUjY1Wk1Od3FtNjF6NFZLVXZoZ0sxQ1Rnb1doZytIZlpyejhiMHdJU2NVLzhRVm9MSFBVWUdjUGxkeDZB&traceId=1",
    stock: 12,
    categoryId: 1
  },
  {
    name: "MacBook Air M3",
    price: 1099,
    description: "Powered by the Apple M3 chip, the MacBook Air delivers exceptional performance with all-day battery life in a thin, light design.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-m4-midnight-gallery1-202503?wid=4000&hei=3074&fmt=jpeg&qlt=90&.v=1739306050451",
    stock: 8,
    categoryId: 2
  },
  {
    name: "Dell XPS 13 Plus",
    price: 1399,
    description: "A minimalist design meets high performance in this ultraportable laptop with 12th Gen Intel processors and a stunning OLED display.",
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/9345/media-gallery/touch/gray/notebook-xps-13-9345-t-gray-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=679&qlt=100,1&resMode=sharp2&size=679,402&chrss=full",
    stock: 5,
    categoryId: 2
  },
  {
    name: "Amazon Echo Show 10",
    price: 249,
    description: "The Echo Show 10 moves with you, ensuring you're always in frame during video calls. Includes Alexa and a 10.1” HD screen.",
    image: "https://m.media-amazon.com/images/I/51qIGisRgqS._AC_SX679_.jpg",
    stock: 9,
    categoryId: 3
  },
  {
    name: "Philips Hue Smart Bulb Starter Kit",
    price: 199,
    description: "Transform your lighting with customizable LED bulbs controlled by your voice or phone, compatible with Alexa, Google Assistant, and Apple HomeKit.",
    image: "https://www.assets.signify.com/is/image/Signify/046677458478-929001180603-Carousel-MainProduct-RTP-01?wid=1280&hei=960&qlt=82",
    stock: 20,
    categoryId: 3
  },
  {
    name: "Sony WH-1000XM5",
    price: 399,
    description: "Industry-leading noise canceling headphones with exceptional sound quality and up to 30 hours of battery life.",
    image: "https://canada.crutchfieldonline.com/ImageHandler/trim/3000/1950/products/2022/19/158/g158100XM5B-F.jpg",
    stock: 7,
    categoryId: 4
  },
  {
    name: "Anker 737 Power Bank (PowerCore 24K)",
    price: 129,
    description: "A beast of a power bank with fast charging for laptops and phones. 24,000mAh capacity and 140W output.",
    image: "https://m.media-amazon.com/images/I/71Linf+GHuL._AC_SL1500_.jpg",
    stock: 14,
    categoryId: 4
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    price: 1649,
    description: "A business-class ultrabook with military-grade durability, Intel vPro processors, and a carbon fiber chassis.",
    image: "https://multimedia.bbycastatic.ca/multimedia/products/500x500/171/17165/17165289.jpeg",
    stock: 6,
    categoryId: 2
  },
  {
    name: "HP Spectre x360 14",
    price: 1249,
    description: "A premium 2-in-1 laptop with an elegant design, OLED touchscreen, and 13th Gen Intel Core performance.",
    image: "https://www.hp.com/content/dam/sites/worldwide/personal-computers/consumer/laptops-and-2-n-1s/spectre/Get%20a%20fresh%20perspective.png",
    stock: 10,
    categoryId: 2
  },
  {
    name: "ASUS ROG Zephyrus G14",
    price: 1599,
    description: "A powerful gaming laptop in a sleek chassis, featuring AMD Ryzen 9, RTX 4060 graphics, and a QHD display.",
    image: "https://dlcdnwebimgs.asus.com/gain/4EF58E53-1C62-44B8-8163-A6A2F4C5BC11/w1000/h732",
    stock: 5,
    categoryId: 2
  },
  {
    name: "Acer Swift X 14",
    price: 1999,
    description: "Lightweight and capable, this creator-friendly laptop comes with an RTX 3050 GPU and Intel Core i7 CPU.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-gallery1-202410?wid=4000&hei=3074&fmt=jpeg&qlt=90&.v=1729264981617",
    stock: 12,
    categoryId: 2
  },
 
  
  

];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
