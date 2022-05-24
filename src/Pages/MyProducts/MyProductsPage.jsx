import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import MyProductsTableComponent from "../../Components/MyProductsTable/MyProductsTableComponent";

const MyProductsPage = () => {
  const [myProductsArr, setMyProductsArr] = useState([]);

  /* const userName = useSelector((state) => state.auth.userData); */

  useEffect(() => {
    axios
      .get("/products/myproducts")
      .then((myProductsArr) => {
        setMyProductsArr(myProductsArr.data.myProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditProduct = (_id) => {
    console.log(_id);
  };

  const handleDeleteProduct = (id) => {};

  return (
    <Fragment>
      <br />
      <h1 className="d-flex align-items-center justify-content-center smartphones-page-title">
        Hello , Here Your Products
      </h1>
      <div className="container">
        <table className="table table-products">
          {/*           <thead>
            <tr>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead> */}
          <tbody>
            {myProductsArr.map((product) => {
              return (
                <MyProductsTableComponent
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  title={product.title}
                  onEditProduct={handleEditProduct}
                  onDeleteProduct={handleDeleteProduct}
                ></MyProductsTableComponent>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default MyProductsPage;
