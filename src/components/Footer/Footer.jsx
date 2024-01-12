import { toast } from "react-toastify";
import FooterSocialIcons from "./FooterSocialIcons";
import { cards } from "./footerData";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      toast.error("Некоректна електронна пошта");
    } else {
      setEmail("");
      toast.success("Ура! Ви успішно підписалися!");
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="md:flex md:justify-between md:items-center bg-[#ffffff19] py-7 px-3 md:px-5 lg:px-10">
        <h1 className="lg:text-2xl text-xl md:mb-0 mb-6  md:w-2/5">
          Будь першим і дізнавайся про наші акції та новини
        </h1>
        <div className="lg:flex gap-2">
          <input
            type="text"
            placeholder="Ваш email..."
            className="text-gray-800 sm:w-full lg:mb-0 mb-2 py-1.5 rounded px-2 focus:outline-none "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-gray-100 hover:bg-gray-200 duration-300 px-5 py-1.5 font-medium text-sm rounded-md text-black md:w-auto w-full"
          >
            Підписатися
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1  md:grid-cols-3 items-center gap-5
      text-center pt-2 text-gray-400 text-xs pb-8 px-3"
      >
        <div>
          <span>Усі права захищені "PANAMA_Shop" © 2024</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          Ми приймаємо:
          <ul className="flex items-center gap-3">
            {cards.map((card) => (
              <li key={card.name}>
                <img src={card.icon} alt={card.name} width={40} />
              </li>
            ))}
          </ul>
        </div>

        <FooterSocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
