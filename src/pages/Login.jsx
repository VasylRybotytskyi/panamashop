import GoogleIcon from "../assets/images/google_icon.svg";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/panamaSlice";
import { useNavigate } from "react-router-dom";

const Login = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userName = user.displayName;
        dispatch(
          addUser({
            _id: user.uid,
            name: userName,
            email: user.email,
            image: user.photoURL,
          })
        );
        toast.success(`Вітаємо, ${userName}`);
        setTimeout(() => {
          navigate("/");
        }, 1500);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-10 px-[60px]">
      <div className="w-full flex items-center justify-center gap-10">
        <div
          onClick={handleGoogleLogin}
          className="text-base w-full h-12 tracking-wide border-2 border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-black cursor-pointer duration-300"
        >
          <img src={GoogleIcon} width={20} />
          <span className="text-sm font-semibold text-gray-900">
            Увійти за допомогою Google
          </span>
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

export default Login;
