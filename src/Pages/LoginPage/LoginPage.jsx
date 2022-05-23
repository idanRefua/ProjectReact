import { useState } from "react";
import Joi from "joi-browser";
import axios from "axios";
import loginSchema from "../../Validations/login.validation";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataFromServer, setDataFromServer] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const hadnleLogin = async (e) => {
    e.preventDefault();
    const validateLogin = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });

    const { error } = validateLogin;

    if (error) {
      alert(error);
    } else {
      try {
        const responseFromServer = await axios.post("/auth/login", {
          email,
          password,
        });
        localStorage.setItem("tokenKey", responseFromServer.data.token);
        setDataFromServer(responseFromServer.data);
        const token = localStorage.getItem("tokenKey");
        const decode = jwt_decode(token);
        dispatch(authActions.updateUser(decode));
        dispatch(authActions.login());
        history.push("/home");
      } catch (error) {
        console.log(error);
        dispatch(authActions.logout());
      }
    }
  };
  return (
    <form onSubmit={hadnleLogin}>
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

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginPage;
