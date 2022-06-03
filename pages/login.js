import styles from '../styles/login.module.css'

import { useState, useEffect } from "react";
import axios from "axios";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/auth/login";

export default function Login() {

    const [error, setError] = useState();
    const [formData, setFormData] = useState({
      username: "",
      password: ""
    });
  
    function handleChange(e) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  
    async function loginUser(e) {
      e.preventDefault();
      setError(null);

      try {
        const response = await axios.post(endPoint, formData);
        console.log(response.data);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
      } catch(err) {
          console.log(err.response.data.message);
          setError(err.response.data.message);
      }
      // console.log(formData);
    }

    return (
        <div>
            <h1 className={styles.h1}>Welcome to Sock Wars!</h1>

            <form onSubmit={(e)=>loginUser(e)}>
                <div className={styles.rulesContainer}>
                    <div className={styles.username}>
                        <h2 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", marginTop: "auto", fontSize: "40px"}}>Sign in</h2>
                        <label>Username:</label>
                        <input type="text" className='form-control' placeholder= "Enter Username" onChange={(e)=>handleChange(e)} name="userName" required></input>
                    </div>

                    <div className={styles.password}>
                        <label>Password:</label>
                        <input type="password" className='form-control' placeholder= "Enter Password" onChange={(e)=>handleChange(e)} name="password" required></input>
                    </div>

                    <div className={styles.submit}>
                        <button type="submit">Login</button>
                    </div>

                    <div className={styles.notRegistered}>
                        Not registered? <a href='#'> click here </a>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}