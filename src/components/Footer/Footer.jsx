import CarFoter from "../../assets/website/CarFoter.png";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
}
 from "react-icons/fa";
const Footer = () => {
  return (
    <div
      id="Footer"
      style={{ maxHeight: "662px",minHeight:"303px",height:"fit-content" }}
      className="continer_foter  flex items-center justify-around  bg-gray-100 dark:bg-dark mt-14 rounded-t-3xl"
    >
      <section className="">
        <div >
          {/* company Details */}
          <div className=" py-8 px-4  ">
            <h1 className="sm:text-4xl  text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 font-serif">
              Car Rental
            </h1>
            <p className=" text-l font-semibold  sm:text-l">
              We are here to offer you the best car rental services at
              competitive prices <br></br> and high quality. Contact us now to
              get the car that suits your needs.<br></br> Follow us on social
              media for more offers and developments.{" "}
            </p>
            <br />
            <div className="flex items-center text-xl gap-4 ">
              <FaLocationArrow />
              <p>@Moayad2234</p>
            </div>
            <div className="flex items-center text-xl gap-4 mt-3">
              <FaMobileAlt />
              <p>+963 935 367 599</p>
            </div>
            {/* Social Handle */}
            <div className="flex items-center gap-3 mt-6">
              <a href="#">
                <FaInstagram className="text-4xl hover:text-cyan-500 duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-4xl hover:text-cyan-500 duration-300" />
              </a>
              <a href="#">
                <FaLinkedin className="text-4xl hover:text-cyan-500  duration-300" />
              </a>
            </div>
          </div>
              </div>
      </section>
      <div className="flex w-64 items-center justify-center">
        <img src={CarFoter} alt="footer" width={250}height={250} />
      </div>
    </div>
  );
};

export default Footer;
