import img01 from "../website/cars-img/bmw-offer.png";
import img02 from "../website/cars-img/Ford.jpg";
import img03 from "../website/cars-img/bmw-offer.png";
import img04 from "../website/cars-img/nissan-offer.png";
import img05 from "../website/cars-img/offer-toyota.png";
import img06 from "../website/cars-img/BMW2.webp";
import img07 from "../website/cars-img/BMW2.webp";
import img08 from "../website/cars-img/mercedes-offer.png";
import img09 from "../website/cars-img/offer-toyota.png";
import img011 from "../website/cars-img/toyota-offer-2.png";
import img012 from "../website/cars-img/hyundai.jpeg";
const carData = [
  {
    id: 1,
    brand: "Tesla",
    slug: "tesla-malibu",
    rating: 112,
    carName: "Tesla Malibu",
    imgUrl: img01,
    model: "Model 3",
    price: 40,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 2,
    brand: "Ford",
    slug: "Ford",
    rating: 102,
    carName: "Ford",
    imgUrl: img02,
    model: "Model-2022",
    price: 40,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
      
  },
  {
    id: 3,
    brand: "BMW",
    slug: "bmw-x3",
    rating: 132,
    carName: "BMW X3",
    imgUrl: img03,
    model: "Model-2022",
    price: 35,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 4,
    brand: "Nissan",
    slug: "nissan-mercielago",
    rating: 102,
    carName: "Nissan Mercielago",
    imgUrl: img04,
    model: "Model-2022",
    price: 50,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 5,
    brand: "Ferrari",
    slug: "ferrari-camry",
    rating: 94,
    carName: "Ferrari Camry",
    imgUrl: img05,
    model: "Model-2022",
    price: 40,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  }
  
  ,
  {
    id:6,
    brand: "BMW",
    slug: "BMW",
    rating: 82,
    carName: "BMW",
    imgUrl: img06,
    model: "Model 3",
    price: 45,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 7,
    brand: "toyota-offer",
    slug: "toyota-offer",
    rating: 119,
    carName: "toyota-offer",
    imgUrl: img011,
    model: "Model-2022",
    price: 55,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  
  
  {
    id: 8,
    brand: "Colorado",
    slug: "rolls-royce-colorado",
    rating: 52,
    carName: "Rolls Royce Colorado",
    imgUrl: img08,
    model: "Model 3",
    price: 40,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 9,
    brand: "Toyota",
    slug: "toyota-aventador",
    rating: 102,
    carName: "Toyota Aventador",
    imgUrl: img09,
    model: "Model-2022",
    price: 30,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 10,
    brand: "Nissan",
    slug: "nissan-mercielago",
    rating: 102,
    carName: "Nissan Mercielago",
    imgUrl: img04,
    model: "Model-2022",
    price: 50,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 11,
    brand: "Mercedes",
    slug: "mercedes-benz-xc90",
    rating: 119,
    carName: "Mercedes Benz XC90",
    imgUrl: img01,
    model: "Model-2022",
    price: 55,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 12,
    brand: "hyundai",
    slug: "hyundai",
    rating: 102,
    carName: "hyundai",
    imgUrl: img012,
    model: "Model-2022",
    price: 30,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 13,
    brand: "BMW",
    slug: "BMW",
    rating: 82,
    carName: "BMW",
    imgUrl: img07,
    model: "Model 3",
    price: 45,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
  {
    id: 14,
    brand: "Colorado",
    slug: "rolls-royce-colorado",
    rating: 52,
    carName: "Rolls Royce Colorado",
    imgUrl: img08,
    model: "Model 3",
    price: 40,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    description:
      "Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua...",
  },
];

export default carData;
