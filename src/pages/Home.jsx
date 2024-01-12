import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import NewSneakers from "../components/NewSneakers";
import Products from "../components/Products";
import { SyncLoader } from "react-spinners";

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <section>
      {loading ? (
        <div className="flex items-center justify-center h-screen  ">
          <SyncLoader color={"black"} loading={loading} size={20} />
        </div>
      ) : (
        <>
          <Banner />
          <NewSneakers />
          <Products />
        </>
      )}
    </section>
  );
};

export default Home;
