import styles from "../styles/registrationpage.module.css";

import axios from "axios";

import { useState, useEffect } from "react";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/auth/register";

export default function Register() {

  const [error, setError] = useState();
  const [confirmPw, setConfirmPw] = useState();
  const [formData, setFormData] = useState({
    username: "",
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
    console.log("clicked");
    if (formData.password===confirmPw) {
      try {
        const response = await axios.post(endPoint, formData);
        console.log(response.data);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
      } catch(err) {
        console.log(err);
      }
    } else {

    }
    // console.log(formData);
  }

  async function registerUser() {
    try {
      const response = await axios.post(endPoint, formData);
      console.log(response);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.box}>
      <form onSubmit={(e) => createUser(e)}>
        <h1>Sock War Registration</h1>
        <div className={styles.info}>
          <input type="text" placeholder="First Name " name="firstName" onChange={(e) => handleChange(e)} size="45" />
        </div>

        <div className={styles.info}>
          <input type="text" placeholder="Last Name" name="lastName" onChange={(e) => handleChange(e)} size="45" />
        </div>

        <div className={styles.info}>
          <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} size="45" />
        </div>

        <div className={styles.info}>
          <input type="text" placeholder="Email" name="email" onChange={(e) => handleChange(e)} size="45" />
        </div>

        <div className={styles.info}>
          <input type="text" placeholder="Password" name="password" onChange={(e) => handleChange(e)} size="45" />
        </div>
        <div className={styles.info}>
          <input type="text" placeholder="Re-enter Password" name="confirmPw" onChange={(e) => onConfirmPwChanged(e)} size="45"/>
        </div>
        <div className={styles.info}>
          Gender
          <select name="gender" id="selectList" onChange={(e) => handleChange(e)}>
            <option value="" disabled selected hidden>
              Select a gender...
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.info}>
          Year
          <select name="year" onChange={(e) => handleChange(e)}>
            <option value="" disabled selected hidden>
              Select a year...
            </option>
            <option value="First">First </option>
            <option value="Second">Second </option>
            <option value="Third">Third </option>
            <option value="Fourth">Fourth </option>
            <option value="Other">Other </option>
          </select>
        </div>

        <div className={styles.info}>
          Section
          <select name="section" onChange={(e) => handleChange(e)}>
            <option value="" disabled selected hidden>
              Select a section...
            </option>
            <option value="option 2">Option 1 </option>
            <option value="option 3">Option 2 </option>
            <option value="option 4">Option 3 </option>
          </select>
        </div>

        <button type="submit">Join!</button>
      </form>
    </div>
  );
}
