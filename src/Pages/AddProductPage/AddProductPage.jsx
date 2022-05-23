import "./add-product-page.css";
import { Fragment, useState } from "react";
import Joi from "joi-browser";
import productSchema from "../../Validations/product.validation";
import axios from "axios";

const AddProductPage = () => {
  const [title, setTitle] = useState("");
  const [shortinfo, setShortInfo] = useState("");
  const [image, setImage] = useState();
  const [description, setDesscription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleShortInfo = (e) => {
    setShortInfo(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const handleDescription = (e) => {
    setDesscription(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validtateProduct = Joi.validate(
      { category, title, shortinfo, image, description, price },
      productSchema,
      { abortEarly: false }
    );

    const { error } = validtateProduct;

    if (error) {
      alert(error);
      console.log(error);
    } else {
      axios
        .post("/products/createproduct", {
          category,
          title,
          shortinfo,
          description,
          price,
          image,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Fragment>
      <div>
        <br />
        <h2 className="d-flex align-items-center justify-content-center add-product-title">
          Here you can Add product to our Website
        </h2>
        <br />
        <br />
        <form className="container add-prodcut-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Category :
              </label>
              <select
                value={category}
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
                  value={title}
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
                  value={shortinfo}
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
                  value={image}
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
                value={description}
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
                  value={price}
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
    </Fragment>
  );
};

export default AddProductPage;
