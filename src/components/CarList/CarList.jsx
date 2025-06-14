import car1 from "../../assets/website/cars-img/hyundai.jpeg";
import car2 from "../../assets/website/cars-img/BMW2.webp";
import car3 from "../../assets/website/cars-img/toyota-offer-2.png";
import { Link } from "react-router-dom";

const carList = [
  {
    id: 1,
    name: "hyundai",
    price: 30,
    image: car1,
    aosDelay: "0",
  },
  {
    id: 2,
    name: "audi-fiesta",
    price: 45,
    image: car2,
    aosDelay: "500",
  },
  {
    id: 3,
    name: "toyota-offer",
    price: 55,
    image: car3,
    aosDelay: "1000",
  },
];

const CarList = () => {
  return (
    <div id="carList" className="pb-24">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Car List Section
        </h1>
        <p data-aos="fade-up" className="text-lg pb-10">
        I drive your dreams today! Explore our distinctive cars at great prices and unpredictable comfort.
        </p>
        {/* Car listing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {carList.map((data) => (
            <div
              key={data.id}
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
            > 
              <div className="w-full h-[120px]">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-blue-500 text-lg  font-semibold">{data.name}</h1>
                <div className="flex justify-between items-center text-xl font-semibold">
                  <p>${data.price}/Day</p>
                  <a className="A-carList" href="/ListsCars">More</a>




                  
                </div>
              </div>
              <p className="text-xl font-semibold absolute top-0 left-3">
                20Km
              </p>
            
            </div>
          ))}
        </div>
      </div>

      <div className="btn-c rounded-xl text-xl font-bold bg-cyan-300 hover:bg-cyan-400 transition duration-500 py-3 px-6 text-black">
        <Link to="./ListsCars">Get Started</Link>
      </div>
    </div>
  );
};

export default CarList;
