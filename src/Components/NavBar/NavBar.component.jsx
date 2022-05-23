import { NavLink } from "react-router-dom";
import "./navbar.component.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Fragment } from "react";

const NavBarComponent = () => {
  const dispatch = useDispatch();
  const loggedInRedux = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.userData);

  const logOut = () => {
    dispatch(authActions.logout());
    localStorage.clear();
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light main-nav ">
        <div className="container-fluid nav-height">
          <a className="nav-link title-store">Refua Store</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  to="/home"
                  activeClassName="activeLink"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  to="/about"
                  activeClassName="activeLink"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link active dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </a>
                <ul
                  className="dropdown-menu drop-down-links"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/products/desktoppc"
                      activeClassName="activeLink"
                    >
                      Desktop Pc
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/products/smartphones"
                      activeClassName="activeLink"
                    >
                      Smartphones
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/products/laptops"
                      activeClassName="activeLink"
                    >
                      Laptops
                    </NavLink>
                  </li>
                </ul>
              </li>
              {!loggedInRedux && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/register"
                      activeClassName="activeLink"
                    >
                      Sign-Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/login"
                      activeClassName="activeLink"
                    >
                      Login
                    </NavLink>
                  </li>
                </Fragment>
              )}
              {user.isAdmin && loggedInRedux && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/addproduct"
                      activeClassName="activeLink"
                    >
                      Sell Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/myproducts"
                      activeClassName="activeLink"
                    >
                      My Products
                    </NavLink>
                  </li>
                </Fragment>
              )}
              {loggedInRedux && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/products/myfavourites"
                      activeClassName="activeLink"
                      aria-current="page"
                    >
                      My Favourites Products
                    </NavLink>
                  </li>
                </Fragment>
              )}
            </ul>
            <div className="d-flex">
              <NavLink
                className="nav-link active"
                to="/login"
                activeClassName="activeLink"
                aria-current="page"
              >
                <li className="nav-item" onClick={logOut}>
                  Log-out
                </li>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBarComponent;
