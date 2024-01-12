import SelectUi from "./SelectUi";
import { brands, seasons, categories } from "./SelectData";
import Price from "./Price";

const FilterForm = ({
  brand,
  season,
  category,
  setBrand,
  setSeason,
  setCategory,
  setPriceRange,
  resetFilters,
  handleToggleActiveFilter,
  priceRange,
}) => {
  return (
    <>
      {/* Заблюрений фон */}
      <div
        onClick={handleToggleActiveFilter}
        className={` fixed inset-0 z-50 bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-[8px] ${
          handleToggleActiveFilter ? "" : "hidden"
        }`}
      ></div>

      {/* Фільтр */}
      <div className="absolute top-0 left-0 h-full w-[80%]  sm:w-[300px] z-50 bg-white py-8 rounded-r-lg flex flex-col gap-3 p-6 border">
        <div className="flex flex-col gap-3 justify-center">
          <SelectUi
            array={brands}
            title="Бренд"
            onChange={setBrand}
            value={brand}
          />
          <SelectUi
            array={seasons}
            title="Сезон"
            onChange={setSeason}
            value={season}
          />
          <SelectUi
            array={categories}
            title="Категорія"
            onChange={setCategory}
            value={category}
          />
          <Price value={priceRange} setPriceRange={setPriceRange} />

          <button
            onClick={resetFilters}
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg h-10"
          >
            Скинути
          </button>
          {/* <button
            onClick={handleToggleActiveFilter}
            className="bg-black text-white rounded-lg h-10"
          >
            Застосувати
          </button> */}
        </div>
      </div>
    </>
  );
};

export default FilterForm;
