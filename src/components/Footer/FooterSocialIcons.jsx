import { icons } from "./footerData";

const FooterSocialIcons = () => {
  return (
    <div className="text-black flex gap-4 justify-center items-center">
      {icons.map(({ icon, link }, index) => (
        <a
          className="hover:scale-110"
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          href={link}
        >
          <img src={icon} width={24} />
        </a>
      ))}
    </div>
  );
};

export default FooterSocialIcons;
