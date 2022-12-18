import Card from "./Card";

const stepData = [
  {
    img: "/img/swap.png",
    title: "Step 1",
    desc: "Find peers with common goals",
    color: "#31ABAE",
  },
  {
    img: "/img/clock.png",
    title: "Step 2",
    desc: "Find peers with common time",
    color: "#EDB343",
  },
  {
    img: "/img/calendar.png",
    title: "Step 3",
    desc: "Book 30 minutes session",
    color: "#62B162",
  },
  {
    img: "/img/time.png",
    title: "Step 4",
    desc: "Meet at your schedule time",
    color: "#3E68EE",
  },
];

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <div className="">
        <div className="row">
          <div className="col-md-10 m-auto">
            <h2 className="heading text-center">How it works?</h2>
            <p className="desc text-center mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="row mt-3">
            {stepData.map((item, i) => (
              <Card
                key={i}
                img={item.img}
                title={item.title}
                desc={item.desc}
                color={item.color}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
