import { useSelector, useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
} from "../redux/panamaSlice";
import { ToastContainer, toast } from "react-toastify";
import imageBag from "../assets/images/bg-bag.png";

const BagItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.panama.productData);
  console.log(productData);

  // Перевірка, чи корзина порожня
  const isCartEmpty = productData.length === 0;

  return (
    <div className="w-full">
      {isCartEmpty ? (
        <div className="flex justify-center items-center">
          <img src={imageBag} alt="Empty Cart" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {productData.map(
            ({
              id,
              images,
              discount,
              category,
              title,
              sizes,
              price,
              description,
              quantity,
            }) => (
              <div
                key={id}
                className="flex gap-6 border rounded-md p-4 relative "
              >
                <div>
                  <img
                    src={images}
                    className="w-32 h-32 object-cover rounded-lg"
                    alt="Зображення продукту"
                  />
                  {discount > 0 && (
                    <p className="absolute top-2 left-1 bg-red-500 text-sm text-white font-semibold px-1 rounded-full ">
                      -{discount}%
                    </p>
                  )}
                </div>
                <h2>
                  {category} {title} {sizes}р
                </h2>

                <div className="flex items-center gap-10 absolute right-3 bottom-3">
                  <div className="flex items-center justify-center gap-2 ">
                    <div
                      onClick={() =>
                        dispatch(
                          decrementQuantity({
                            id,
                            title,
                            images,
                            price,
                            quantity: 1,
                            description,
                          })
                        )
                      }
                      className="font-semibold text-lg cursor-pointer duration-300 "
                    >
                      <FaMinus />
                    </div>
                    <div className="flex items-center justify-center border w-12 h-8 rounded-lg">
                      <span>{quantity}</span>
                    </div>
                    <span
                      onClick={() =>
                        dispatch(
                          incrementQuantity({
                            id,
                            title,
                            images,
                            price,
                            quantity: 1,
                            description,
                          })
                        )
                      }
                      className="text-lg  cursor-pointer duration-300 "
                    >
                      <FaPlus />
                    </span>
                  </div>

                  <div className="flex flex-col font-normal">
                    <p className="text-gray-400 line-through text-right">
                      {quantity * price}&#8372;
                    </p>
                    <p className="text-red-500 text-xl ">
                      {(((price * (100 - discount)) / 100) * quantity).toFixed(
                        0
                      )}
                      &#8372;
                    </p>
                  </div>
                </div>

                <MdOutlineClose
                  onClick={() =>
                    dispatch(deleteItem(id)) & toast.error(`${title} видалено `)
                  }
                  className="absolute top-1 right-1 text-xl to-gray-600 hover:text-red-600 cursor-pointer duration-300 "
                />
              </div>
            )
          )}
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
    </div>
  );
};

export default BagItem;
