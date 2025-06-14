// src/components/ListsCars/CarDetails.jsx

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import carData from "../../assets/data/carData";
import { FaSignOutAlt } from "react-icons/fa";

const CarDetails = () => {
  const { slug } = useParams();
  const singleCarItem = carData.find((item) => item.slug === slug);

  useEffect(() => {
    if (!singleCarItem) {
      console.log("Car not found");
    }
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  if (!singleCarItem) {
    return (
      <div className="container mx-auto p-6 ">
        <h2 className="text-xl font-bold">Car not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Link to="/ListsCars">
      <button className="btn-exit"><FaSignOutAlt/></button> </Link>
      <section className="flex flex-wrap">
       
        {/* صورة السيارة */}
        <div className="w-full lg:w-1/2 p-4">

          <img
            src={singleCarItem.imgUrl}
            alt={singleCarItem.carName}
            className="w-full h-auto"
          />
        </div>

        {/* تفاصيل السيارة */}
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold">{singleCarItem.carName}</h2>
          <div className="flex items-center gap-5 mb-4 mt-3">
            <h6 className="text-xl font-bold">
              ${singleCarItem.price}.00 / Day
            </h6>
            <span className="flex items-center gap-2">
              <span className="text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="ri-star-s-fill"></i>
                ))}
              </span>
              ({singleCarItem.rating} ratings)
            </span>
          </div>
          <p className="text-gray-700 mb-4">{singleCarItem.description}</p>

          {/* معلومات السيارة */}
          <div className="flex flex-wrap gap-10 mt-3">
            <span className="flex items-center gap-1 text-gray-700">
              <i className="ri-roadster-line text-yellow-500"></i>{" "}
              {singleCarItem.model}
            </span>
            <span className="flex items-center gap-1 text-gray-700">
              <i className="ri-settings-2-line text-yellow-500"></i>{" "}
              {singleCarItem.automatic}
            </span>
            <span className="flex items-center gap-1 text-gray-700">
              <i className="ri-timer-flash-line text-yellow-500"></i>{" "}
              {singleCarItem.speed}
            </span>
          </div>
          <div className="flex flex-wrap gap-10 mt-3">
            <span className="flex items-center gap-1 text-gray-700">
              <i className="ri-map-pin-line text-yellow-500"></i>{" "}
              {singleCarItem.gps}
            </span>
            <span className="flex items-center gap-1 text-gray-700">
              <i className="ri-wheelchair-line text-yellow-500"></i>{" "}
              {singleCarItem.seatType}
            </span>
            <span className="flex items-center gap-1 text-gray-700">
              <i className="ri-building-2-line text-yellow-500"></i>{" "}
              {singleCarItem.brand}
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap mt-10">
        {/* قسم الحجز */}
        <div className=" w-full lg:w-2/3 p-4">
          <h5 className="ml-32 text-2xl font-bold mb-4">Booking Information</h5>
          <form className="booking__form grid grid-cols-2 gap-2  ">
           
          
              <input type="text" placeholder="First Name"   className="w-full p-2 mb-4 border rounded" />
            
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 mb-4 border rounded"
            />
            <input
        type="email" placeholder="Email"
              className="w-full p-2 mb-4 border rounded"
            />
            <input
    type="number" placeholder="Phone Number"
              className="w-full p-2 mb-4 border rounded"
            />
          <input type="text" placeholder="From Address" 
              className="w-full p-2 mb-4 border rounded"
            />
         <input type="text" placeholder="To Address" 
              className="w-full p-2 mb-4 border rounded"
            />

            <input type="date" placeholder="Journey Date" className="w-full p-2 mb-4 border rounded" />
            <textarea
          rows={4}
          type="textarea"
          className="textarea"
          placeholder="Write"
        ></textarea>
            <div className="flex justify-center items-center  ">
            <button
              type="submit"
              className="rounded-2xl w-full bg-green-500 hover:bg-green-600 text-lg text-white p-2 rounded mt-4"
            >
              Book Now
            </button></div>
          </form>
        </div>

        {/* قسم الدفع */}
        <div className="w-full lg:w-1/3 p-4">
          <h5 className=" btn-carD  text-2xl font-bold mb-4">Payment Information</h5>
          <div>
            <label className="block text-gray-700 mb-2">Payment Method</label>
            <select className="w-full p-2 border rounded mb-4">
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
            <button className="rounded-2xl bg-green-500 hover:bg-green-600 w-full bg-green-500 text-lg text-white p-2 rounded mt-4">
              Proceed to Payment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarDetails;
