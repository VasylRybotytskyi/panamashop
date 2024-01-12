import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.svg";
import logoFooter from "../assets/images/footerLogo.svg";

const Logo = ({ icon }) => {
  const activeIcon = icon === "logoFooter" ? logoFooter : logo;
  return (
    <div className="relative">
      <Link to="/">
        <div>
          <img src={activeIcon} alt="Logo" className="h-8 lg:h-10 text-white" />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
