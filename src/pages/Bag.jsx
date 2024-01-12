import BagModal from "../components/Header/BagModal";

import Title from "../components/Title";

const Bag = () => {
  // const productData = useSelector((state) => state.panama.productData);
  // const userInfo = useSelector((state) => state.panama.userInfo);
  // const [totalAmt, setTotalAmt] = useState("");

  // useEffect(() => {
  //   let price = 0;
  //   productData.map((item) => {
  //     price += item.price * item.quantity;
  //     return price;
  //   });
  //   setTotalAmt(price.toFixed(2));
  // }, [productData]);

  // const handleCheckout = () => {
  //   if (userInfo) {
  //     toast.success("дякую за покупку");
  //   } else {
  //     toast.error("Please sign in to checkout");
  //   }
  // };
  return (
    <section className="py-5 max-w-screen-xl mx-auto px-2">
      <div className="flex flex-col gap-3 ">
        <Title title="Корзина" />
        <BagModal />
        {/* <BagItem /> */}
      </div>
    </section>
  );
};

export default Bag;
