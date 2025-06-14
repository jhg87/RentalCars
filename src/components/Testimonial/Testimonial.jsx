const testimonialData = [
  {
    name: "Dilshad",
    image: "",
    description:
      "The service was exceptional and beyond expectations. Highly recommended!",
    aosDelay: "0",
    
  },
  {
    name: "Satya",
    image: "",
    description:
      "Professional,timely,and very helpful. i had a great experience working with them.",
    aosDelay: "300",
  },
  {
    name: "Sabir",
    image: "",
    description:
      "Truly satisfied with the quality and the attention to detail. will definitely come back again.",
    aosDelay: "1000",
  },
  
];
const Testimonial = () => {
  return (
    <>  
      <span id="about"></span>
      <div className="dark:bg-black sm:min-h-[800px] dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Clients Say About Us
            </p>
            <p data-aos="fade-up" className="text-center ">
              we&apos;re proud of the positive feedback we receive. Here&apos;s
              of our happy clients have to say:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
          {testimonialData.map((skill, index) => (
  <div
    key={skill.name + index}
    data-aos="fade-up"
    data-aos-delay={skill.aosDelay}
    className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300 rounded-lg"
  >
    <div className="grid place-items-center">
      <img
        src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${Math.floor(Math.random() * 90)}.jpg`}
        alt={`${skill.name}'s avatar`}
        className="rounded-full w-20 h-20 object-cover"
      />
    </div>
    <div className="text-2xl">⭐️⭐️⭐️⭐️⭐️</div>
    <p>{skill.description}</p>
    <p className="text-center font-semibold">{skill.name}</p>
  </div>
))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;




