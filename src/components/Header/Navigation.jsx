import { FaRegHeart } from "react-icons/fa";
import { IoHome, IoGrid } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/panamaSlice";

const navData = [
  { icon: <IoHome />, name: "Домашня", link: "/" },
  { icon: <IoGrid />, name: "Каталог", link: "/catalog" },
  { icon: <FaRegHeart />, name: "Улюблені", link: "/favorites" },
  { icon: <SlBasket />, name: "Кошик", link: "" },
];

const Navigation = ({ handleToggleMenu, handleOpenModal, handleOpenBag }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.panama.userInfo);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Вихід успішний");
        dispatch(removeUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleToggleMenu}
      className="fixed inset-0 z-100 bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-[8px]  "
    >
      <div
        onClick={handleContentClick}
        className="w-[80%] h-full rounded-lg bg-white relative "
      >
        <div className="flex justify-between border-b px-7 py-4">
          <UserMenu handleOpenModal={handleOpenModal} />
        </div>
        <div className="flex flex-col gap-10 px-6">
          <ul className="flex flex-col gap-3 py-3">
            {navData.map(({ icon, name, link }) => (
              <li key={name}>
                <Link
                  className="flex gap-4 items-center text-md"
                  onClick={() => {
                    handleToggleMenu();
                    if (link === "") {
                      handleOpenBag();
                    }
                  }}
                  to={link}
                >
                  <span className="bg-gray-100 p-3 text-lg rounded-full">
                    {icon}
                  </span>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          {userInfo && (
            <button
              onClick={() => {
                handleSignOut();
                handleToggleMenu();
              }}
              className="font-medium text-sm bg-red-500 text-white rounded-full py-2 w-[100px] mx-auto flex justify-center"
            >
              Вихід
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
