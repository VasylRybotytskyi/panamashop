import { signOut } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/panamaSlice";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const UserMenu = ({ handleOpenProfile, handleOpenModal }) => {
  const dispatch = useDispatch();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Log out successfully");
        dispatch(removeUser());
        setOpenUserMenu(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userMenuItem = [
    { label: "Профіль", onClick: handleOpenProfile },
    { label: "Вихід", onClick: handleSignOut },
  ];
  const userInfo = useSelector((state) => state.panama.userInfo);

  const menuRef = useRef(null);

  const handleOpenUserMenu = () => {
    if (userInfo) {
      setOpenUserMenu(!openUserMenu);
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenUserMenu(false);
      setActiveItem(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const userNameArray = userInfo?.name?.split(" ") || [];
  const firstName = userNameArray[0] || "";

  return (
    <div className="relative" ref={menuRef}>
      <div className="hidden  md:flex gap-3 items-center font-medium">
        <img
          onClick={handleOpenUserMenu}
          className=" w-8 h-8 rounded-full cursor-pointer relative"
          src={
            userInfo
              ? userInfo.image
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7wrKjpbjvQzLHlQfvKO8gsopOJBvbCEXe1A&usqp=CAU"
          }
          alt="user-logo"
        />
        <p>{firstName}</p>
      </div>
      <div className="md:hidden flex gap-3 items-center font-medium">
        <img
          className=" w-8 h-8 rounded-full cursor-pointer relative"
          src={
            userInfo
              ? userInfo.image
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7wrKjpbjvQzLHlQfvKO8gsopOJBvbCEXe1A&usqp=CAU"
          }
          alt="user-logo"
        />
        <p>
          {firstName}
          {userInfo ? (
            ""
          ) : (
            <button onClick={handleOpenModal} className="md:hidden">
              Увійти
            </button>
          )}
        </p>
      </div>
      {openUserMenu && (
        <div
          className="bg-white p-4 w-40 shadow-2xl absolute border rounded-lg left-[-60px]
         top-[47px] "
        >
          <ul>
            {userMenuItem.map((item) => (
              <li
                className={`p-2 text-md cursor-pointer rounded hover:bg-gray-100 ${
                  activeItem === item.label ? "bg-gray-200" : ""
                }`}
                key={item.label}
                onClick={() => {
                  setActiveItem(item.label);
                  if (item.onClick) {
                    item.onClick();
                  }
                }}
              >
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
