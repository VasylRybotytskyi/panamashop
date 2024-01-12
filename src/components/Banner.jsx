import Slider from "react-slick";
import bannerone from "../assets/images/bannerone.jpg";
import bannertwo from "../assets/images/bannertwo.jpg";

import bannerthree from "../assets/images/bannerthree.jpg";
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";

const Banner = () => {
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="p-3 bg-slate-100 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute right-5 top-1/2"
      >
        <PiCaretRightLight />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="p-3 bg-slate-100 hover:text-orange-600 hover:bg-white cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute left-5 top-1/2"
      >
        <PiCaretLeftLight />
      </div>
    );
  };

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="mx-auto relative">
      <Slider {...settings}>
        <div className="w-full h-full relative">
          <img
            src={bannerone}
            alt="Banner One"
            className="w-full h-full relative"
          />
          {/* <BannerText title="Outware Picks" /> */}
        </div>
        <div className="w-full h-full relative">
          <img
            src={bannertwo}
            alt="Banner Two"
            className="w-full h-full relative"
          />
          {/* <BannerText title="Seasonal Offers" /> */}
        </div>
        <div className="w-full h-full relative">
          <img
            src={bannerthree}
            alt="Banner Three"
            className="w-full h-full relative"
          />
          {/* <BannerText title="Best for men" /> */}
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
