import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "./smartphone-page.css";
import ProductCardComponent from "../../Components/ProductCard/ProductCard.component";
const SmartphoneProductsPage = () => {
  const [smartPhonesArr, setSmartphonesArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    axios
      .get("/products/smartphones")
      .then((res) => {
        console.log(res.data);
        setSmartphonesArr(res.data.allSmartphones);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Fragment>
      <br />
      <h1 className="d-flex align-items-center justify-content-center smartphones-page-title">
        Smartphones
      </h1>

      <br />
      <div className="row">
        <div className="col">
          <div className="row">
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearch}
              value={searchTerm}
              className="input-search"
            />

            {smartPhonesArr
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item) => {
                return (
                  <ProductCardComponent
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    title={item.title}
                    shortinfo={item.shortinfo}
                  ></ProductCardComponent>
                );
              })}
          </div>
        </div>
        <div className="col-2">
          <div className="filter-menu">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
              voluptate reprehenderit nisi quam libero, consequatur laudantium
              numquam dicta eveniet dolorum.
            </p>
            <p>
              Repellendus perferendis rerum accusantium cumque dolor in
              laudantium excepturi ab blanditiis, sint minus quo? Cum nesciunt
              quae soluta dolorum quod?
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SmartphoneProductsPage;

{
  /* <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">
    Default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
  <label class="form-check-label" for="flexRadioDefault2">
    Default checked radio
  </label>
</div>
 */
}
