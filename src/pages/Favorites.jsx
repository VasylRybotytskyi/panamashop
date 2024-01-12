import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Title from "../components/Title";
import ProductsCard from "../components/ProductsCard";

const Favorites = () => {
  const favoriteData = useSelector((state) => state.panama.favoriteData);
  console.log(favoriteData);

  return (
    <section className="px-3 md:px-5 lg:px-10 py-4 max-w-screen-2xl mx-auto  ">
      <Title title="Улюблені" />

      {favoriteData.length === 0 ? (
        <p
          className="text-center text-gray-500 py-[50%] 
       md:py-[40%] lg:py-[20%]  "
        >
          Тут порожньо. Додайте товари до улюблених.
        </p>
      ) : (
        <div className="grid lgl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 py-5 ">
          {favoriteData?.map((favoriteItem) => (
            <ProductsCard key={favoriteItem.id} item={favoriteItem} />
          ))}
        </div>
      )}

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};

export default Favorites;
