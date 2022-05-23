import axios from "axios";
import { useEffect, useState } from "react";
import ProductCardComponent from "../../Components/ProductCard/ProductCard.component";
const MyProductsPage = () => {
  const [myDesktopPcArr, setDesktopPcArr] = useState([]);

  useEffect(() => {
    axios
      .get("/products/desktoppc/")
      .then((myDesktopPc) => {
        setDesktopPcArr(myDesktopPc.data.allDesktopPc);
        console.log(myDesktopPc.data.allDesktopPc);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <div className="row">
        {myDesktopPcArr.map((item) => {
          return (
            <ProductCardComponent
              key={item._id}
              image={item.image}
              title={item.title}
              shortinfo={item.shortinfo}
            ></ProductCardComponent>
          );
        })}
      </div>
    </div>
  );
};

export default MyProductsPage;
