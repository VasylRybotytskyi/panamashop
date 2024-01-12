import { nanoid } from "nanoid";
import NovaPosta from "../../assets/images/novaposta.png";
import UkrPosta from "../../assets/images/ukrposhta.png";

export const deliveries = [
  {
    id: nanoid(),
    icon: NovaPosta,
    name: "Нова пошта",
    deliver: "(За тарифами перевізника)",
  },
  {
    id: nanoid(),
    icon: UkrPosta,
    name: "Укрпошта",
    deliver: "(За тарифами перевізника)",
  },
];
