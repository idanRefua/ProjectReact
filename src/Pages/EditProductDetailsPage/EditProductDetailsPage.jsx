import axios from "axios";
import Joi from "joi-browser";
import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import productSchema from "../../Validations/product.validation";

const EditProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/products/moreinfo/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => console.log(err));
  }, [id, product]);

  const [title, setTitle] = useState(product.title);
  const [shortinfo, setShortInfo] = useState(product.shortinfo);
  const [image, setImage] = useState(product.image);
  const [description, setDesscription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editValidateProduct = Joi.validate(
      {
        category,
        title,
        shortinfo,
        image,
        description,
        price,
      },
      productSchema,
      { abortEarly: false }
    );

    const { error } = editValidateProduct;
    if (error) {
      alert(error);
    } else {
      axios
        .put(`/products/updateproducts/${id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Fragment>
      <div className="container">
        {product !== null && (
          <div>
            <br />
            <h2 className="d-flex align-items-center justify-content-center add-product-title">
              Here you can Add product to our Website
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
        )}
      </div>
    </Fragment>
  );
};

export default EditProductDetailsPage;
