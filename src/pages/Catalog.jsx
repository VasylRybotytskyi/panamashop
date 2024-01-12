import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../redux/SneakersApi";
import ProductsCard from "../components/ProductsCard";
import Search from "../components/Filter/Search";
import { CiFilter } from "react-icons/ci";
// import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import FilterForm from "../components/Filter/FilterForm";
import NotFind from "../assets/images/not-find.png";
import { SyncLoader } from "react-spinners";
import Title from "../components/Title";

const Catalog = () => {
  const { data } = useGetProductsQuery();
  const [brand, setBrand] = useState("all");
  const [season, setSeason] = useState("all");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([1, 9999]);
  const [query, setQuery] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);

  const resetFilters = () => {
    setBrand("all");
    setSeason("all");
    setCategory("all");
    setPriceRange([1, 9999]);
    setQuery("");
  };

  const handleToggleActiveFilter = () => {
    setIsActiveFilter(!isActiveFilter);
  };

  const handleToggleActiveSearch = () => {
    setIsActiveSearch(!isActiveSearch);
  };

  // Отримуємо значення параметрів запиту при завантаженні компонента
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlBrand = urlSearchParams.get("brand");
    const urlSeason = urlSearchParams.get("season");
    const urlMinPrice = urlSearchParams.get("minPrice");
    const urlMaxPrice = urlSearchParams.get("maxPrice");
    const urlCategory = urlSearchParams.get("category");

    setBrand(urlBrand || "all");
    setSeason(urlSeason || "all");
    setCategory(urlCategory || "all");
    setPriceRange([
      urlMinPrice ? parseInt(urlMinPrice) : 0,
      urlMaxPrice ? parseInt(urlMaxPrice) : 9999,
    ]);
  }, []);

  // Оновлюємо URL-рядок при зміні значень фільтрів
  useEffect(() => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("brand", brand);
    urlSearchParams.set("season", season);
    urlSearchParams.set("category", category);
    urlSearchParams.set("minPrice", priceRange[0].toString());
    urlSearchParams.set("maxPrice", priceRange[1].toString());

    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }, [brand, season, category, priceRange]);

  const filteredData = data?.filter((item) => {
    const brandFilter =
      brand === "all" || item.title.toLowerCase().includes(brand.toLowerCase());
    const seasonFilter =
      season === "all" ||
      (Array.isArray(item.season) && item.season.includes(season));
    const priceFilter =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    const queryFilter =
      query.trim() === "" ||
      item.title.toLowerCase().includes(query.toLowerCase());
    const categoryFilter =
      category === "all" ||
      item.category.toLowerCase().includes(category.toLowerCase());

    return (
      brandFilter &&
      seasonFilter &&
      priceFilter &&
      queryFilter &&
      categoryFilter
    );
  });

  return (
    <section className="max-w-screen-2xl mx-auto  py-10 px-3 md:px-5 lg:px-10  ">
      {loading ? (
        <div className="flex items-center justify-center h-screen  ">
          <SyncLoader color={"black"} loading={loading} size={20} />
        </div>
      ) : (
        <>
          <Title title="Каталог" />
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <div className="bg-black text-white px-2 py-1 my-5 rounded-lg w-[120px]">
                <div
                  className="flex gap-1 items-center justify-center"
                  onClick={handleToggleActiveFilter}
                >
                  <CiFilter className="text-2xl" />
                  <span>Фільтр</span>
                </div>
                {isActiveFilter && (
                  <FilterForm
                    brand={brand}
                    season={season}
                    category={category}
                    setBrand={setBrand}
                    setSeason={setSeason}
                    setCategory={setCategory}
                    setPriceRange={setPriceRange}
                    resetFilters={resetFilters}
                    handleToggleActiveFilter={handleToggleActiveFilter}
                    isActiveFilter={isActiveFilter}
                    priceRange={priceRange}
                  />
                )}
              </div>
              <button
                onClick={resetFilters}
                className="my-5 p-2 bg-black text-white rounded-lg"
              >
                <GrPowerReset />
              </button>
            </div>

            <div className="bg-black text-white p-2 rounded-full ">
              <FaSearch onClick={handleToggleActiveSearch} />
              {isActiveSearch && (
                <Search
                  onChange={setQuery}
                  closeSearch={handleToggleActiveSearch}
                  filteredData={filteredData}
                />
              )}
            </div>
          </div>
          <div
            className={` gap-2 ${
              filteredData && filteredData.length === 0
                ? "flex items-center justify-center"
                : "grid lgl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
            }`}
          >
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => (
                <ProductsCard key={item.id} item={item} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <img src={NotFind} alt="Not Found" />
                <div className=" text-gray-500 text-xl">
                  За вашим запитом нічого не знайдено
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Catalog;
