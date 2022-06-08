import axios from "axios";
import Joi from "joi-browser";
import { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import productSchema from "../../Validations/product.validation";

const EditProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/products/moreinfo/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleTitle = (e) => {
    setProduct({ ...product, title: e.target.value });
  };

  const handleShortInfo = (e) => {
    setProduct({ ...product, shortinfo: e.target.value });
  };

  const handleImage = (e) => {
    setProduct({ ...product, image: e.target.value });
  };

  const handleDescription = (e) => {
    setProduct({ ...product, description: e.target.value });
  };
  const handlePrice = (e) => {
    setProduct({ ...product, price: e.target.value });
  };

  const handleCategory = (e) => {
    setProduct({ ...product, category: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newProduct = { ...product };
    const editValidateProduct = Joi.validate(
      {
        title: newProduct.title,
        shortinfo: newProduct.shortinfo,
        image: newProduct.shortinfo,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
      },
      productSchema,
      { abortEarly: false }
    );

    const { error } = editValidateProduct;
    if (error) {
      alert(error);
    } else {
      axios
        .put(`/products/updateproducts/${id}`, newProduct)
        .then((res) => {
          history.push("/myproducts");
        })
        .catch((err) => console.log(err));
    }
  };
  if (!product) return <div>No Product</div>;
  return (
    <Fragment>
      <div className="container">
        {product !== null && (
          <div>
            <br />
            <h2 className="d-flex align-items-center justify-content-center add-product-title">
              Edit Your Product
            </h2>
            <br />
            <br />
            <form
              className="container add-prodcut-form"
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Category :
                  </label>
                  <select
                    value={product.category || ""}
                    onChange={handleCategory}
                    className="form-select"
                    id="inputGroupSelect01"
                  >
                    <option value="Desktop PC">Desktop PC</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Laptops">Laptops</option>
                  </select>
                </div>
                <section className="col-sm">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Title (Name Of the Product)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleTitle}
                      value={product.title || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Short Info
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleShortInfo}
                      value={product.shortinfo || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Image Url
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleImage}
                      value={product.image || ""}
                    />
                  </div>
                </section>
                <div className="mb-3 col-sm">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Descripton
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="7"
                    onChange={handleDescription}
                    value={product.description || ""}
                  ></textarea>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handlePrice}
                      value={product.price || ""}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-lg btn-primary d-flex align-items-center justify-content-center "
                >
                  Upload The Product !
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default EditProductDetailsPage;
