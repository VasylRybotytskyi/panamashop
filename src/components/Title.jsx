import React from "react";

const Title = ({ title }) => {
  return (
    <div className="flex flex-col items-center gap-4  ">
      <h1 className="sm:text-md md:text-lg lg:text-xl bg-black text-white py-1 lg:py-2 px-[40px] text-center rounded-lg">
        {title}
      </h1>
    </div>
  );
};

export default Title;
