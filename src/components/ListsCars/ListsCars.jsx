import carData from "../../assets/data/carData";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const ListsCars = () => {
  return (
    <div className=" container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Available Cars</h2>  
          <Link to="/">
            <button className="btn-exit-ItemCars"><FaSignOutAlt/></button> </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {carData.map((car) => (
          <div key={car.slug} className="bg-slate-50 border p-7 rounded shadow">
            <img
              src={car.imgUrl}
              alt={car.carName}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className=" text-2xl text-center font-semibold">{car.carName}</h3>
            <p className="text-gray-600 text-xl  font-semibold text-center">${car.price}/Day</p>
            <span className="flex gap-9 text-lg  text-green-600">
            <p className="text-l ri-settings-2-line "  >{car.model} </p>
            <p className="text-l ri-roadster-line"  >{car.automatic}
            </p>
            <p className="text-l ri-timer-flash-line " >{car.speed}</p>
            </span>
            <Link
              to={`/cars/${car.slug}`}
              className="flex justify-center mt-[10px]"
            >
              <button className="bg-orange-400 hover:bg-orange-500  text-white font-semibold py-2 px-6 rounded-lg shadow" > View Details </button>
           
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsCars;
