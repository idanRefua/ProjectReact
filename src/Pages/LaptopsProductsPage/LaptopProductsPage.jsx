import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "./LaptopProductsPage";
import ProductCardComponent from "../../Components/ProductCard/ProductCard.component";

const LaptopProductsPage = () => {
  const [laptopsArr, setLetptopsArr] = useState([]);
  useEffect(() => {
    axios
      .get("/products/laptops")
      .then((res) => {
        console.log(res.data.allLaptops);
        setLetptopsArr(res.data.allLaptops);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <div className="row">
        {laptopsArr.map((laptop) => {
          return (
            <ProductCardComponent
              key={laptop._id}
              id={laptop._id}
              image={laptop.image}
              title={laptop.title}
              shortinfo={laptop.shortinfo}
            ></ProductCardComponent>
          );
        })}
      </div>
    </Fragment>
  );
};

export default LaptopProductsPage;
