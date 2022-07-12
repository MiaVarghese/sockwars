import styles from '../styles/login.module.css'

import { useState } from "react";
import Router from "next/router";
import axios from "axios";
import LoadButton from "./components/LoadButton";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/auth/login";

export default function Login() {
    const [error, setError] = useState();
    const [btnLoading, setBtnLoading] = useState(false);
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
      setBtnLoading(true);

      try {
        const response = await axios.post(endPoint, formData);
        Router.push("/");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch(err) {
          setBtnLoading(false);
          console.log(err.response.data.message);
          setError(err.response.data.message);
      }
      // console.log(formData);
    }

    return (
        <div>
            <h1 className={styles.header}>Welcome to Sock Wars!</h1>

            <form onSubmit={(e)=>loginUser(e)}>
                <div className={styles.rulesContainer}>
                    <h2 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", marginTop: "auto", fontSize: "40px"}}>Sign in</h2>
                    {error ? 
                        <div className="alert alert-danger m-1" role="alert">
                            {error}
                        </div>
                    :
                        <div></div>
                    }
                
                    <div className={styles.username}>
                        <label>Username:</label>
                        <input type="text" className='form-control' placeholder= "Enter Username" onChange={(e)=>handleChange(e)} name="userName" required></input>
                    </div>

                    <div className={styles.password}>
                        <label>Password:</label>
                        <input type="password" className='form-control' placeholder= "Enter Password" onChange={(e)=>handleChange(e)} name="password" required></input>
                    </div>

                    <div className={styles.submit}>
                        {/* <button className="btn btn-primary" style={{position: "relative"}} type="submit">
                            Login
                            { btnLoading ?
                                <div style={{position: "absolute", left: "30%", top: "5%"}} className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                <div></div>
                            }
                        </button> */}
                        <LoadButton className="btn btn-primary" type="submit" btnLoading={btnLoading}>Login</LoadButton>
                    </div>

                    <div className={styles.notRegistered}>
                        Not registered? <a href='#'> click here </a>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}