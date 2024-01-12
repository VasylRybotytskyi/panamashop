import { useGetProductsQuery } from "../redux/SneakersApi";
import { SyncLoader } from "react-spinners";
import ProductsCard from "./ProductsCard";
import Title from "./Title";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  console.log(data);

  return isLoading ? (
    <SyncLoader
      color={"black"}
      loading={isLoading}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  ) : (
    <div className="">
      <Title title="Розпродаж" />
      <div className="max-w-screen-2xl mx-auto py-10 px-3 md:px-5 lg:px-10 grid lgl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 ">
        {data?.map((item) => (
          <ProductsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
