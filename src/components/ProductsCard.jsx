import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { addToCart, addToFavorite } from "../redux/panamaSlice";
import { nanoid } from "nanoid";

const ProductsCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, title, images, price, description, category, discount, sizes } =
    item;

  const isFavorite = useSelector((state) =>
    state.panama.favoriteData.some((item) => item.id === id)
  );
  const userInfo = useSelector((state) => state.panama.userInfo);

  const favoriteColor = isFavorite ? "red" : "";
  const [selectedSize, setSelectedSize] = useState(sizes ? sizes[0] : "");

  const idString = (title, size) =>
    `${title.toLowerCase().split(" ").join("-")}-${size}`;
  const rootId = idString(title, selectedSize);

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: { item: { ...item, rootId, selectedSize } },
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: rootId,
        title,
        images,
        price,
        quantity: 1,
        description,
        category,
        discount,
        sizes: selectedSize, // додайте розмір
      })
    );
    toast.success(`${title} додано до кошика`);
  };

  const handleAddToFavorite = () => {
    dispatch(
      addToFavorite({
        id,
        title,
        images,
        price,
        discount,
        quantity: 1,
        description,
        category,
        sizes,
      })
    );
  };

  const priceWithDiscount = (price - (price * discount) / 100).toFixed(0);

  const handleFavoriteClick = () => {
    if (userInfo) {
      handleAddToFavorite();
    } else {
      toast.error("Будьласка авторизуйтесь");
    }
  };

  return (
    <div className="group w-full h-full flex flex-col overflow-hidden rounded-lg relative">
      <div
        onClick={handleDetails}
        className="w-full h-60 cursor-pointer overflow-hidden rounded-t-md"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-300"
          src={images}
          alt="productImg"
        />
      </div>

      <div
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 text-2xl lg:text-3xl z-100 hover:scale-110 duration-300 delay-300"
      >
        <CiHeart fill={userInfo && favoriteColor} />
      </div>

      <div className="w-full border-[1px] px-3 py-2 rounded-b-md flex flex-col justify-between flex-grow">
        <div className="flex items-center gap-1">
          <h2 className="font-semibold text-md ">
            {category} {title}
            <div>
              <select
                className="border border-black rounded text-xs"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {sizes?.map((size) => (
                  <option value={size} key={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between ">
            <div className="flex flex-col justify-center text-sm">
              {discount === 0 ? (
                ""
              ) : (
                <div className="flex gap-1 items-center">
                  <p className="text-gray-400 line-through text-xs lg:text-sm">
                    {price} <span>&#8372;</span>
                  </p>
                  <p className="text-xs lg:text-sm font-medium bg-gray-100 rounded-full px-1">
                    -{price - priceWithDiscount}
                  </p>
                </div>
              )}
              <p
                className={`text-black font-semibold text-xl ${
                  discount === 0 ? "md:text-3xl text-2xl" : "lg:text-2xl"
                }  `}
              >
                {priceWithDiscount} <span>&#8372;</span>
              </p>
            </div>
            <div>
              <button
                onClick={handleAddToCart}
                className="bg-black text-white p-3 rounded-md"
              >
                <SlBasket className="text-xl lg:text-2xl" />
              </button>
            </div>
          </div>

          <div className="absolute top-4 left-1">
            {discount > 0 && (
              <p className="bg-black text-white text-xs  sml:text-sm lg:text-md font-normal px-2 py-1 rounded-lg">
                Знижка
              </p>
            )}
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default ProductsCard;
