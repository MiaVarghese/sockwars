import styles from "../styles/registrationpage.module.css";

import axios from "axios";
import Router from "next/router";
import { useState, useEffect } from "react";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/auth/register";

export default function Register() {

  const [error, setError] = useState();
  const [confirmPw, setConfirmPw] = useState();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    year: "",
    section: ""
  });

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onConfirmPwChanged(e) {
    setConfirmPw(e.target.value);
  }

  async function createUser(e) {
    e.preventDefault();
    setError(null);

    if (formData.password===confirmPw) {
      try {
        const response = await axios.post(endPoint, formData);
        Router.push("/");
      } catch(err) {
        setError(err.response.data.message);
      }
    } else {
      setError("Passwords do not match");
    }
    // console.log(formData);
  }

  return (
    <div className="p-5">
      <form style={{background: "white", margin: "auto"}} className="col-8 px-4" onSubmit={(e) => createUser(e)}>
        <h1 style={{textAlign: "center"}}>Create Account</h1>
        {error ? 
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        :
          <div></div>
        }

        <div className="row py-1">
          <div className="col-6">
            <input type="text" className="form-control" placeholder="First Name " name="firstName" onChange={(e) => handleChange(e)} />
          </div>
          <div className="col-6">
            <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={(e) => handleChange(e)} />
          </div>
        </div>

        <div className="row py-1">
          <div className="col-6">
            <input type="text" className="form-control" placeholder="Username" name="userName" onChange={(e) => handleChange(e)} />
          </div>
          <div className="col-6">
            <input type="text" className="form-control" placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
          </div>
        </div>

        <div className="row py-1">
          <div className="col-6">
            <input type="password" className="form-control" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
          </div>
          <div className="col-6">
            <input type="password" className="form-control" placeholder="Re-enter Password" name="confirmPw" onChange={(e) => onConfirmPwChanged(e)} />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            Gender
            <select className="form-control" name="gender" id="selectList" onChange={(e) => handleChange(e)}>
              <option value="" disabled selected hidden>
                Select a gender...
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-6">
            Year
            <select className="form-control" name="year" onChange={(e) => handleChange(e)}>
              <option value="" disabled selected hidden>
                Select a year...
              </option>
              <option value="first">First </option>
              <option value="second">Second </option>
              <option value="third">Third </option>
              <option value="fourth">Fourth </option>
              <option value="other">Other </option>
            </select>
          </div>
        </div>

        <div>
          Section
          <select className="form-control" name="section" onChange={(e) => handleChange(e)}>
            <option value="" disabled selected hidden>
              Select a section...
            </option>
            <option value="baritone">Baritone </option>
            <option value="clarinet">Clarinet </option>
            <option value="color guard and twirler">Color Guard and Twirler </option>
            <option value="drum major">Drum Major </option>
            <option value="drumline">Drumline </option>
            <option value="horn">Horn </option>
            <option value="piccolo">Piccolo </option>
            <option value="saxophone">Saxophone </option>
            <option value="staff">Staff </option>
            <option value="trombone">Trombone </option>
            <option value="trumpet">Trumpet </option>
            <option value="tuba">Tuba </option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">Join!</button>
      </form>
    </div>
  );
}
