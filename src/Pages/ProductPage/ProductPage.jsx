import axios from "axios";

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./product-page.css";
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productLikes, setProductLikes] = useState([]);

  const userId = useSelector((state) => state.auth.userData._id);

  useEffect(() => {
    axios
      .get(`/products/moreinfo/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setProductLikes(res.data.product.likes);
      })
      .catch((err) => console.log(err));
  }, [id, userId]);

  const handleFavourite = () => {
    axios
      .post(`/products/addlike/${product._id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveFavourite = () => {
    axios
      .post(`/products/removelikeproduct/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <br />

      <br />
      {product !== null && (
        <div className="container ">
          <div className="row">
            <div className="col-6">
              <img
                src={product.image}
                className="img-fluid product-image"
                alt={product.title}
              />
            </div>
            <div className="col-6">
              <h3 className="product-title">{product.title}</h3>
              <hr />
              <p>{product.description}</p>
              <br />
              <h4>{product.price}</h4>
              <br />
              {!productLikes.includes(userId) ? (
                <button className="btn btn-primary" onClick={handleFavourite}>
                  Add To Favourite
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleRemoveFavourite}
                >
                  Remove From My Favourites
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductPage;
