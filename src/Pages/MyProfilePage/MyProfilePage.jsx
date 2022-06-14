import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "./my-profile-page.css";
import Joi from "joi-browser";
import editDetailsSchema from "../../Validations/editDetails.validation";

import editPasswordSchema from "../../Validations/changePassword.validation";

const MyProfilePage = () => {
  const [userFromData, setUserFromData] = useState(null);
  const [editPdetails, setEditPdetails] = useState(false);
  const [editPasswordForm, setEditPasswordForm] = useState(false);
  ///
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  useEffect(() => {
    axios
      .get("/auth/mydetails")
      .then((res) => {
        setUserFromData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const editDetails = () => {
    setEditPdetails(true);
  };
  const sendUpdateDetails = (e) => {
    e.preventDefault();
    setEditPdetails(false);
    let userUpdates = { ...userFromData };
    const validateEditDetails = Joi.validate(
      {
        email: userFromData.email,
        firstname: userFromData.firstname,
        lastname: userFromData.lastname,
      },
      editDetailsSchema,
      {
        abortEarly: false,
      }
    );

    const { error } = validateEditDetails;

    if (error) {
      alert(error);
    } else {
      axios
        .patch(`/auth/edituserdetails/${userFromData._id}`, {
          email: userUpdates.email,
          firstname: userUpdates.firstname,
          lastname: userUpdates.lastname,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleName = (e) => {
    setUserFromData({ ...userFromData, firstname: e.target.value });
  };
  const handleLastName = (e) => {
    setUserFromData({ ...userFromData, lastname: e.target.value });
  };
  const handleEmail = (e) => {
    setUserFromData({ ...userFromData, email: e.target.value });
  };

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNewPassword2 = (e) => {
    setNewPassword2(e.target.value);
  };

  const changePassword = (e) => {
    e.preventDefault();

    const validateEditPassword = Joi.validate(
      { currentPassword, newPassword, newPassword2 },
      editPasswordSchema,
      { abortEarly: false }
    );

    const { error } = validateEditPassword;

    if (error) {
      alert(error);
    } else {
      axios
        .patch(`/auth/changepass/${userFromData._id}`, {
          currentPassword,
          newPassword,
          newPassword2,
        })
        .then(() => setEditPasswordForm(false))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <br />
      <h1 className="d-flex align-items-center justify-content-center my-profile-title">
        My Profile Page
      </h1>
      <br />
      <div className="row">
        <div className="col">
          <div className="row">
            {userFromData !== null && (
              <div className="user-info">
                {!editPdetails && (
                  <Fragment>
                    <h5>Name: {userFromData.firstname || ""}</h5>
                    <h5>Last Name: {userFromData.lastname || ""}</h5>
                    <h5>Email: {userFromData.email || ""}</h5>
                    <br />
                    <button onClick={editDetails}>Edit Details</button>
                  </Fragment>
                )}
                {editPdetails && (
                  <Fragment>
                    <h5>
                      Name:
                      <input
                        type="text"
                        onChange={handleName}
                        value={userFromData.firstname || ""}
                      />
                    </h5>
                    <h5>
                      Last Name:
                      <input
                        type="text"
                        onChange={handleLastName}
                        value={userFromData.lastname || ""}
                      />
                    </h5>
                    <h5>
                      Email:
                      <input
                        type="text"
                        onChange={handleEmail}
                        value={userFromData.email || ""}
                      />
                    </h5>
                    <br />
                    <button type="submit" onClick={sendUpdateDetails}>
                      Update Details
                    </button>
                  </Fragment>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="col-6">
          {!editPasswordForm && (
            <button
              className="btn btn-info"
              onClick={() => {
                setEditPasswordForm(true);
              }}
            >
              Change Password
            </button>
          )}
          {editPasswordForm && (
            <Fragment>
              <h5>
                Current Password :
                <input
                  type="password"
                  onChange={handleCurrentPassword}
                  value={currentPassword}
                />
              </h5>
              <h5>
                New Password :
                <input
                  type="password"
                  onChange={handleNewPassword}
                  value={newPassword}
                />
              </h5>
              <h5>
                Verify New Password :
                <input
                  type="password"
                  onChange={handleNewPassword2}
                  value={newPassword2}
                />
              </h5>
              <br />
              <button type="submit" onClick={changePassword}>
                Change Password
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
