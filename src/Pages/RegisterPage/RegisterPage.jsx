import "./register-page.css";
import axios from "axios";
import Joi from "joi-browser";
import registerSchema from "../../Validations/register.validation";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [dataFromServer, setDataFromServer] = useState(null);
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handlisAdmin = (e) => {
    setIsAdmin(e.target.checked);
  };

  const hadnleRegister = async (e) => {
    e.preventDefault();

    const validateUserRegister = Joi.validate(
      {
        email,
        password,
        firstname,
        lastname,
        phone,
        isAdmin,
      },
      registerSchema,
      {
        abortEarly: false,
      }
    );
    const { error } = validateUserRegister;
    if (error) {
      alert(error);
      console.log(error);
    } else {
      try {
        const responseFromServer = await axios.post("/auth/register", {
          email,
          password,
          firstname,
          lastname,
          phone,
          isAdmin,
        });
        setDataFromServer(responseFromServer.data);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container">
      <h1 className="register-title">You can register for free!</h1>
      <form className="box-register-form" onSubmit={hadnleRegister}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            aria-describedby="emailHelp"
            value={firstname}
            onChange={handleFirstName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            aria-describedby="emailHelp"
            value={lastname}
            onChange={handleLastName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Phone
          </label>
          <input
            type="phone"
            className="form-control"
            id="phone"
            aria-describedby="emailHelp"
            value={phone}
            onChange={handlePhone}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputInput" className="form-label">
            Bussines User? (Bussines Users Can Add Their products to our
            website)
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value={isAdmin}
              onChange={handlisAdmin}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Yes, I want to be Bussines User
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
