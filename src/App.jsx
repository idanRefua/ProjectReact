import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBarComponent from "../src/Components/NavBar/NavBar.component";
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import MyProductsPage from "./Pages/MyProducts/MyProductsPage";
import AddProductPage from "./Pages/AddProductPage/AddProductPage";
import FooterComponent from "../src/Components/Footer/Footer.component";
import AuthRoute from "./AuthRoute/AuthRoute";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import MyFavouritesPage from "./Pages/MyFavouritesPage/MyFavouritesPage";
import DesktopPcProductsPage from "./Pages/DesktopPcProductsPage/DesktopPcProductsPage";
import LaptopProductsPage from "./Pages/LaptopsProductsPage/LaptopProductsPage";
import SmartphoneProductsPage from "./Pages/SmartphoneProductsPage/SmartphoneProductsPage";
import ProductPage from "./Pages/ProductPage/ProductPage";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("tokenKey");
    if (!token) {
      console.log("here");
      dispatch(authActions.logout());
      return;
    }

    const decoded = jwt_decode(token);
    const date = new Date();
    if (decoded.exp < date.getTime() / 1000) {
      dispatch(authActions.logout());
      history.push("/login");
    } else {
      dispatch(authActions.login());
      dispatch(authActions.updateUser(decoded));
    }
  }, [dispatch, history]);

  return (
    <div className="container-fluid">
      <NavBarComponent></NavBarComponent>
      <div className="container-fluid pages">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <AuthRoute path="/myproducts" component={MyProductsPage} />
          <AuthRoute path="/addproduct" component={AddProductPage} />
          <AuthRoute
            path="/products/desktoppc"
            component={DesktopPcProductsPage}
          />
          <AuthRoute path="/products/laptops" component={LaptopProductsPage} />
          <AuthRoute
            path="/products/smartphones"
            component={SmartphoneProductsPage}
          />
          <AuthRoute
            path="/products/myfavourites"
            component={MyFavouritesPage}
          />
          <AuthRoute path="/products/moreinfo/:id" component={ProductPage} />
        </Switch>
      </div>
      <div className="footer">
        <FooterComponent></FooterComponent>
      </div>
    </div>
  );
}

export default App;
