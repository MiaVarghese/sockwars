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
      <form style={{color: "white", margin: "auto", backgroundColor: "#2A3B4B"}} className="col-8 px-4 py-3" onSubmit={(e) => createUser(e)}>
        <h1 style={{textAlign: "center"}}>Create Account</h1>
        {error ? 
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        :
          <div></div>
        }

        <div className="row pb-2">
          <div className="col-6">
            <label for="firstName" class="form-label">
              First name
            </label>
            <input type="text" className="form-control" id="firstName" onChange={(e) => handleChange(e)} />
          </div>
          <div className="col-6">
            <label for="lastName" class="form-label">
              Last name
            </label>
            <input type="text" className="form-control" id="lastName" onChange={(e) => handleChange(e)} />
          </div>
        </div>

        <div className="row pb-2">
          <div className="col-6">
            <label for="userName" class="form-label">
              Username
            </label>
            <input type="text" className="form-control" id="userName" onChange={(e) => handleChange(e)} />
          </div>
          <div className="col-6">
            <label for="email" class="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" onChange={(e) => handleChange(e)} />
          </div>
        </div>

        <div className="row pb-2">
          <div className="col-6">
            <label for="password" class="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" onChange={(e) => handleChange(e)} />
          </div>
          <div className="col-6">
            <label for="confirmPassword" class="form-label">
              Confirm password
            </label>
            <input type="password" className="form-control" id="confirmPassword" onChange={(e) => onConfirmPwChanged(e)} />
          </div>
        </div>

        <div className="row pb-2">
          <div className="col-6">
            <label for="gender" class="form-label">
              Gender
            </label>
            <select className="form-control" id="gender" onChange={(e) => handleChange(e)}>
              <option value="" disabled selected hidden>
                Select a gender...
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-6">
            <label for="year" class="form-label">
              Year
            </label>
            <select className="form-control" id="year" onChange={(e) => handleChange(e)}>
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

        <div className="row pb-3">
          <div className="col-6">
            <label for="section" class="form-label">
            Section
            </label>
            <select className="form-control" id="section" onChange={(e) => handleChange(e)}>
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
        </div>

        <div style={{textAlign: "center"}}>
          <button className="btn btn-warning col-6" type="submit">Join!</button>
        </div>
      </form>
    </div>
  );
}
