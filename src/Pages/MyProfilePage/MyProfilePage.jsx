import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "./my-profile-page.css";
import Joi from "joi-browser";

import editDetailsSchema from "../../Validations/editDetails.validation";
const MyProfilePage = () => {
  const [userFromData, setUserFromData] = useState(null);
  const [editPdetails, setEditPdetails] = useState(false);

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

  return (
    <div className="container">
      <br />
      <h1 className="d-flex align-items-center justify-content-center my-profile-title">
        My Profile Page
      </h1>
      <br />
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
  );
};

export default MyProfilePage;

/* 
 const [newUser, setNewUser] = useState();
 const user = useSelector((state) => state.auth.userData);
 const [editPdetails, setEditPdetails] = useState(false);
 const userId = useSelector((state) => state.auth.userData._id);

 const editDetails = () => {
   setNewUser(user);
   setEditPdetails(true);
 };
 const sendUpdateDetails = () => {
   setEditPdetails(false);
   let newUserTwo = { ...newUser };
   const validateEditDetails = Joi.validate(
     {
       email: newUserTwo.email,
       firstname: newUserTwo.firstname,
       lastname: newUserTwo.lastname,
     },
     editDetailsSchema,
     { abortEarly: false }
   );
   console.log(newUser);
   const { error } = validateEditDetails;

   if (error) {
     alert(error);
   } else {
     axios
       .put(
         `/auth/edituserdetails/${userId}`,
         newUserTwo.email,
         newUserTwo.firstname,
         newUserTwo.lastname
       )
       .then((res) => console.log("update"))
       .catch((err) => console.log(err));
   }
 };
 const handleName = (e) => {
   setNewUser({ ...newUser, firstname: e.target.value });
 };
 const handleLastName = (e) => {
   setNewUser({ ...newUser, lastname: e.target.value });
 };
 const handleEmail = (e) => {
   setNewUser({ ...newUser, email: e.target.value });
 };

 return (
   <div className="container">
     <br />
     <h1 className="d-flex align-items-center justify-content-center my-profile-title">
       My Profile Page
     </h1>
     <br />
     <div className="user-info">
       {!editPdetails && (
         <Fragment>
           <h5>Name: {user.firstname}</h5>
           <h5>Last Name: {user.lastname}</h5>
           <h5>Email: {user.email}</h5>
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
               value={newUser.firstname}
             />
           </h5>
           <h5>
             Last Name:
             <input
               type="text"
               onChange={handleLastName}
               value={newUser.lastname}
             />
           </h5>
           <h5>
             Email:
             <input type="text" onChange={handleEmail} value={newUser.email} />
           </h5>
           <br />
           <button onClick={sendUpdateDetails}>Update Details</button>
         </Fragment>
       )}
     </div>
   </div>
 ); */
