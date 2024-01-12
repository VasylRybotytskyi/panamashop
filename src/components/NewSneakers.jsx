import React, { useState } from "react";
import Title from "./Title";
import ProductsCard from "./ProductsCard";
import { useGetProductsQuery } from "../redux/SneakersApi";

const NewSneakers = () => {
  const { data } = useGetProductsQuery();
  const itemsPerPage = 5;
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  return (
    <div className="py-10  max-w-screen-2xl mx-auto px-3 md:px-5 lg:px-10 ">
      <Title title="Новинки" />
      <div className="py-5 grid lgl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-2 ">
        {data
          ?.filter((item) => item.novetly) // Fix the typo in "novetly" to "novelty"
          .slice(0, visibleItems)
          .map((item) => (
            <ProductsCard key={item.id} item={item} />
          ))}
      </div>
      {visibleItems < (data?.length || 0) && (
        <button
          className="bg-black text-white  py-2 w-[200px]  h-10 rounded-lg "
          onClick={handleShowMore}
        >
          Показати більше...
        </button>
      )}
    </div>
  );
};

export default NewSneakers;
