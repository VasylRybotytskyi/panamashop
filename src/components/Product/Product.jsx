import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/panamaSlice";
import { ToastContainer, toast } from "react-toastify";
import Star from "../../assets/images/star.svg";
import { deliveries } from "./ProductData";
import { SlBasket } from "react-icons/sl";
import ProductCarousel from "./ProductCarousel";
import { IoMdCheckmark } from "react-icons/io";

const Product = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const [activeSize, setActiveSize] = useState("");

  const location = useLocation();

  const {
    category,
    title,
    images,
    discount,
    price,
    rating,
    description,
    sizes,
  } = details;

  useEffect(() => {
    setDetails(location.state.item);
    // Встановлюємо розмір за замовчуванням при завантаженні компонента
    if (sizes && sizes.length > 0) {
      setActiveSize(sizes[0]);
    }
  }, [location.state.item, sizes, images]);

  // Генерація унікального ідентифікатора для кореневого елемента
  const idString = (title, size) =>
    `${(title || "").toLowerCase().split(" ").join("-")}-${String(size || "")
      .toLowerCase()
      .split(" ")
      .join("-")}`;

  const rootId = idString(title, activeSize);

  return (
    <div>
      {/* Основний контейнер */}
      <div className="max-w-screen-2xl mx-auto my-10 flex flex-col md:flex-row gap-10 px-3 md:px-5 lg:px-10 ">
        {/* Блок зображення продукту */}
        <div className=" md:w-[50%] lg:w-[40%] flex xl:items-center justify-center relative ">
          <ProductCarousel image={images}>
            {Array.isArray(images) &&
              images.map((image, index) => (
                <img
                  key={index}
                  className="w-full h-[350px] xl:h-[550px]  object-cover flex-shrink-0"
                  src={image}
                  alt="Зображення продукту"
                />
              ))}
          </ProductCarousel>
          {/* Показує знижку, якщо вона є */}
          <div className="absolute top-4 left-4">
            {discount > 0 && (
              <p className="bg-black text-white font-semibold rounded-lg px-3 py-1">
                Знижка
              </p>
            )}
          </div>
        </div>

        {/* Блок інформації про продукт */}
        <div className="md:w-[50%] lg:w-[60%] flex flex-col justify-start gap-4">
          <div>
            {/* Заголовок продукту */}
            <h2 className="text-2xl lg:text-3xl font-semibold">
              {category} {title} {activeSize}р
            </h2>
          </div>

          {/* Інформація про наявність та рейтинг */}
          <div className="flex md:flex-col md:items-start gap-3 items-center justify-between  text-base">
            <div className="flex gap-[2px] bg-green-50 px-2 py-1 rounded-lg items-center  text-green-500 font-medium ">
              {/* Іконка "в наявності" */}
              <IoMdCheckmark />
              <p>в наявності</p>
            </div>

            <div className="flex">
              {/* Рейтинг у вигляді зірок */}
              {Array.from({ length: rating }, (_, index) => (
                <img
                  src={Star}
                  key={index}
                  width={15}
                  alt={`Зірка ${index + 1}`}
                />
              ))}
            </div>
            {/* Кількість відгуків (може бути додана в майбутньому) */}
          </div>

          {/* Блок ціни та кнопки купити */}
          <div className="flex items-center justify-between md:justify-start gap-10">
            <div className="flex flex-col font-medium">
              {/* Ціна та знижка */}
              <p className="text-gray-400 line-through ">{price}&#8372;</p>
              <p className="text-red-500 text-3xl">
                {((price * (100 - discount)) / 100).toFixed(0)}
                &#8372;
              </p>
            </div>

            {/* Кнопка купити */}
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: rootId,
                    title,
                    category,
                    images,
                    price,
                    quantity: 1,
                    description,
                    discount,
                    sizes: activeSize,
                  })
                ) & toast.success(`${title} додано до кошика`)
              }
              className="flex gap-2 items-center bg-black text-white py-3 px-6 active:bg-gray-800 rounded-lg"
            >
              <SlBasket /> Купити
            </button>
          </div>

          {/* Блок розмірів продукту */}
          <div className="flex flex-col gap-2">
            <p className="font-medium md:text-sm text-base">Розмір:</p>
            <div className="flex gap-1">
              {/* Кнопки розмірів */}
              {sizes &&
                sizes.map((size, index) => (
                  <button
                    onClick={() => setActiveSize(size)}
                    className={`border px-4 py-1 rounded-lg ${
                      activeSize === size ? "bg-gray-300" : ""
                    }`}
                    key={index}
                  >
                    {size}
                  </button>
                ))}
            </div>
          </div>

          {/* Блок опису продукту */}
          <div className="flex flex-col gap-2">
            <p className="font-medium md:text-sm text-base">Опис:</p>
            <p className="md:text-sm text-base text-gray-500 ">{description}</p>
          </div>

          {/* Блок доставки та гарантії */}
          <div className="flex flex-col gap-3">
            {/* Блок доставки */}
            <div className="flex flex-col gap-2">
              <p className="font-medium md:text-sm text-base">Доставка:</p>
              <ul className="flex flex-col gap-2">
                {/* Елементи доставки */}
                {deliveries.map(({ icon, name, id, deliver }) => (
                  <li
                    className="flex gap-2 items-center md:text-sm text-base"
                    key={id}
                  >
                    <img src={icon} alt="Доставка іконка" width={20} />
                    <span>{name}</span>
                    <span className="text-gray-500 text-sm md:text-xs">
                      {deliver}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Блок гарантії */}
            <div className="flex flex-col gap-2">
              <p className="font-medium md:text-sm text-base">Гарантія:</p>
              <p className="text-gray-500 md:text-sm text-base">
                Обмін/повернення товару належної якості протягом 14 днів.
                <br />
                Гарантія від виробника: 12 міс
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Контейнер повідомлень */}
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

export default Product;
