import { CiSearch } from "react-icons/ci";

const Search = ({ onChange, closeSearch, filteredData }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={closeSearch}
      className="fixed inset-0  z-50 bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-[9px] py-6 rounded-lg flex flex-col gap-3"
    >
      <div
        onClick={handleContentClick}
        className="justify-center items-center flex "
      >
        <div className="relative px-2 flex flex-col items-center gap-10 ">
          <input
            className="border-gray-300 border p-2 rounded-full w-full sm:w-[250px] md:w-[300px] lg:w-[350px]  outline-none text-black"
            type="search"
            placeholder="Пошук..."
            onChange={(e) => onChange && onChange(e.target.value)}
          />
          <button className="absolute top-2 right-4 text-xl bg-gray-300 rounded-full p-1">
            <CiSearch onClick={closeSearch} />
          </button>
          {/* <div className="text-black text-xl">
        {filteredData && `За вашим запитом ${filteredData.length} Результатів`}
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default Search;
