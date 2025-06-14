import { useEffect } from "react";
import carPng from "../../assets/car.png";
import BlueCar from "../../assets/banner-car.png";
import AOS from "aos";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Hero = ({ theme }) => {
  useEffect(() => {
    AOS.refresh();
  });
  return (
    <div className="dark:bg-black dark:text-white duration-300 ">
      <div className="container min-h-[685px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? carPng : BlueCar}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[400px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              Car Rental
            </h1>
            <p className="text-xl" data-aos="fade-up" data-aos-delay="1000">
              We have cars for sale and rent, and our mission is to achieve high
              value for our customers by providing the best services.<br></br>We
              have a chatbot for your assistant and and answers all your
              questions{" "}
            </p>
            {/* <button
              data-aos="fade-up"
              data-aos-delay="1500"
              onClick={() => {
                AOS.refreshHard();
              }}
              className="rounded-md text-xl font-bold bg-cyan-300 hover:bg-cyan-400 transition duration-500 py-3 px-6 text-black"
            >
             chatbot
            </button> */}
            <div className="btn-sh rounded-xl text-xl font-bold bg-cyan-300 hover:bg-cyan-400 transition duration-500 py-3 px-6 text-black">
              <Link to={"/chat"}>ChatBot</Link>
              {/* <a  href="/localhost:3000">chatbot</a> */}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
