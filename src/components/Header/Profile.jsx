import React from "react";
import { useSelector } from "react-redux";

const Profile = ({ isProfileOpen, handleOpenProfile }) => {
  const { userInfo } = useSelector((state) => state.panama);

  return (
    <>
      {isProfileOpen && (
        <div
          onClick={handleOpenProfile}
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center backdrop-blur"
        >
          <div className=" flex flex-col items-center justify-center gap-10 rounded-full">
            {userInfo && (
              <>
                <img
                  className="rounded-full"
                  src={userInfo.image || "default-image-url-if-not-available"}
                  alt="User Avatar"
                  style={{ width: "200px", height: "200px" }}
                />
                <span className="text-2xl font-semibold text-white">
                  {userInfo.name}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
