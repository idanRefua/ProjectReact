import axios from "axios";
import { useEffect, useState } from "react";
import ProductCardComponent from "../../Components/ProductCard/ProductCard.component";

const DesktopPcProductsPage = () => {
  const [desktopPcArr, setDesktoppcArr] = useState([]);
  useEffect(() => {
    axios
      .get("/products/desktoppc")
      .then((res) => {
        console.log(res.data.allDesktopPc);
        setDesktoppcArr(res.data.allDesktopPc);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {desktopPcArr.map((item) => {
          return (
            <ProductCardComponent
              id={item._id}
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

export default DesktopPcProductsPage;
