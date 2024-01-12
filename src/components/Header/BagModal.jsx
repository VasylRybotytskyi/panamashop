import BagItem from "../BagItem";
import { resetCart } from "../../redux/panamaSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

const BagModal = ({ isModalBag, handleOpenBag }) => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.panama.productData);

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleClearBag = () => {
    productData.length > 0
      ? dispatch(resetCart()) & toast.success("Вашу корзину очищено!")
      : toast.error("Ваша коризна уже пуста!");
  };

  const handleSuccessShopping = () => {
    productData.length > 0 &&
      toast.success("Дякую за покупку!") &&
      dispatch(resetCart()) &&
      handleOpenBag();
  };

  // Розрахунок суми товарів в корзині
  const totalAmount = productData.reduce(
    (acc, { price, discount, quantity }) => {
      const discountedPrice = (price * (100 - discount)) / 100;
      const itemTotal = discountedPrice * quantity;
      return acc + itemTotal;
    },
    0
  );

  return (
    <div>
      {isModalBag && (
        <div
          onClick={handleOpenBag}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <div
            onClick={handleContentClick}
            className="w-[95%] h-[95%] md:w-[70%] lg:w-[50%] md:h-[90%] bg-white border flex flex-col justify-start rounded-lg relative"
          >
            <div className="rounded-t-lg bg-gray-50 border-b">
              <h2 className="text-center py-2 text-2xl font-semibold">
                Корзина
              </h2>
            </div>

            <div
              className="w-full h-full p-[15px] flex flex-col justify-center items-center"
              style={{
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <BagItem />
            </div>

            <div className="absolute top-3 right-1 text-2xl">
              <button onClick={handleOpenBag}>
                <IoClose />
              </button>
            </div>

            <div className="flex flex-col  p-2 bg-gray-50 rounded-b-lg">
              <div>
                {productData.length > 0 && (
                  <div className=" flex justify-end pb-2 font-medium">
                    Загальна сума: {totalAmount.toFixed(0)} &#8372;
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleClearBag}
                  className="bg-red-500 text-white p-2
      hover:bg-red-800 duration-300 rounded-lg "
                >
                  Очистити корзину
                </button>
                <button
                  onClick={handleSuccessShopping}
                  className={`border rounded-lg p-2 text-white ${
                    productData.length > 0 ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  Оформити замовлення
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BagModal;
