import CarPng from "../../assets/car1.png";


const About = () => {
  return (
    <div id="about" className="dark:bg-dark bg-slate-100 sm:min-h-[800px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1600">
            <img
              src={CarPng}
              alt=""
              className="image-container sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p
                data-aos="fade-up"
                className="leading-10 tracking-wide text-2xl "
              >
    Welcome to distinguished cars 
     We specialize in renting new and used cars.  
      We aim to provide distinguished services that meet your
       needs and exceed your expectations. For practical
        and comfortable rental, we offer you different options
       at high quality and competitive prices
              </p>

         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
