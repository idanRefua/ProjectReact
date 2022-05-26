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

  const handleDeleteProduct = (id) => {
    const confirm = window.confirm(
      "Are You sure You want delete this product?"
    );
    if (confirm === true) {
      axios
        .delete(`/products/deleteproduct/${id}`)
        .then((res) => {
          console.log(res.data);
          let newProductsArr = myProductsArr.filter(
            (product) => product._id !== id
          );
          setMyProductsArr(newProductsArr);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Fragment>
      <br />
      <h1 className="d-flex align-items-center justify-content-center smartphones-page-title">
        Hello , Here Your Products
      </h1>
      <div className="container">
        <table className="table table-products">
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
