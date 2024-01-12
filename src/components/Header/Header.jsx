import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import Logo from "../Logo";
import { LuLayoutGrid } from "react-icons/lu";
import LoginModal from "./LoginModal";
import { useState } from "react";
import Profile from "./Profile";
import BagModal from "./BagModal";
import { GiHamburgerMenu } from "react-icons/gi";
import Navigation from "./Navigation";

const Header = () => {
  const { favoriteData, productData, userInfo } = useSelector(
    (state) => state.panama
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBag, setIsModalBag] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log(isProfileOpen);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenBag = () => {
    setIsModalBag(!isModalBag);
  };

  const handleOpenProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="w-full h-[50px] md:h-[60px] lg:h-[70px] bg-white border-b-[1px] border-b-gray-800 sticky top-0 z-50">
        <div className="max-w-screen-2xl h-full mx-auto flex items-center justify-between px-3 md:px-5 lg:px-10">
          <Logo />

          <div className="md:hidden">
            <GiHamburgerMenu onClick={handleToggleMenu} />
            {isMenuOpen && (
              <Navigation
                handleToggleMenu={handleToggleMenu}
                handleOpenModal={handleOpenModal}
                handleOpenBag={handleOpenBag}
                isMenuOpen={isMenuOpen}
              />
            )}
          </div>

          <div className="md:flex md:items-center md:gap-8 md:relative hidden mr-2">
            <div className="bg-black px-3 py-2 rounded-lg">
              <Link to="/catalog">
                <div className="flex items-center gap-1 font-semibold text-white">
                  <LuLayoutGrid className="text-xl lg:text-2xl" />
                  <span className="text-sm lg:text-md">Каталог</span>
                </div>
              </Link>
            </div>

            {userInfo ? (
              <Link to="/favorites">
                <div className="relative">
                  <FaRegHeart className="text-2xl" />
                  <span className="absolute w-4 h-4 top-3 left-3 text-sm flex items-center justify-center font-semibold bg-blue-400 rounded-full">
                    {favoriteData.length}
                  </span>
                </div>
              </Link>
            ) : (
              <div onClick={handleOpenModal}>
                <div className="relative">
                  <FaRegHeart className="text-2xl" />
                </div>
              </div>
            )}

            <div onClick={handleOpenBag}>
              <div className="relative cursor-pointer">
                <SlBasket className="text-2xl" />
                <span className="absolute w-4 h-4 top-3 left-3 text-sm flex items-center justify-center font-semibold bg-blue-400  rounded-full">
                  {productData.length}
                </span>
              </div>
            </div>

            <div
              onClick={() => !userInfo && handleOpenModal()}
              className="flex gap-2 items-center  "
            >
              <UserMenu
                handleOpenModal={handleOpenModal}
                handleOpenProfile={handleOpenProfile}
              />
            </div>
          </div>
        </div>
      </div>

      <LoginModal handleOpenModal={handleOpenModal} isModalOpen={isModalOpen} />
      <Profile
        handleOpenProfile={handleOpenProfile}
        isProfileOpen={isProfileOpen}
      />
      <BagModal handleOpenBag={handleOpenBag} isModalBag={isModalBag} />
    </>
  );
};

export default Header;
