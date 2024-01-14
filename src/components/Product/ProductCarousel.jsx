import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ProductCarousel = ({ children, image }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const totalImages = React.Children.count(children);

  const prev = () =>
    setCurrentImg((currentImg) =>
      currentImg === 0 ? totalImages - 1 : currentImg - 1
    );

  const next = () =>
    setCurrentImg((currentImg) =>
      currentImg === totalImages - 1 ? 0 : currentImg + 1
    );

  return (
    <div className=" w-full rounded-lg overflow-hidden relative">
      <div
        className=" flex transition-transform ease-out duration-500 "
        style={{ transform: `translateX(-${currentImg * 100}%)` }}
      >
        {children}
      </div>
      {totalImages > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prev}
            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white "
          >
            <FaChevronLeft size={30} />
          </button>
          <button
            onClick={next}
            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white "
          >
            <FaChevronRight size={30} />
          </button>
        </div>
      )}
      <div className="absolute bottom-4 right-0 left-0">
        {totalImages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {image.map((_, i) => (
              <div
                key={i}
                className={`transition-all w-3 h-3 bg-white rounded-full ${
                  currentImg === i ? "p-2" : "bg-opacity-50"
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
