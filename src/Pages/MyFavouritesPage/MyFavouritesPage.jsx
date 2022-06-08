import "./my-favourites-page.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MyFavouritesPage = () => {
  const userName = useSelector((state) => state.auth.userData.name);
  const [favouriteProductsArr, setFavouriteProductsArr] = useState([]);
  useEffect(() => {
    axios
      .get("/products/myfavourites")
      .then((res) => setFavouriteProductsArr(res.data.myFavourites))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <br />
      <h1 className="d-flex align-items-center justify-content-center my-favourites-title">
        {userName},Here Your Favourites Products
      </h1>
      <br />
      {favouriteProductsArr.map((product) => {
        return <div>{product.title}</div>;
      })}
    </div>
  );
};

export default MyFavouritesPage;
