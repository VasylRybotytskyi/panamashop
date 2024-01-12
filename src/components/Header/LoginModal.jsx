import Login from "../../pages/Login";

const LoginModal = ({ isModalOpen, handleOpenModal }) => {
  //

  return (
    <div>
      {isModalOpen && (
        <div
          onClick={handleOpenModal}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center "
        >
          <div className="w-[400px] bg-white border flex flex-col items-center justify-center gap-10 py-5 rounded-lg">
            <h2 className="text-xl font-medium">Авторизація</h2>
            <Login closeModal={handleOpenModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
