import styles from '../styles/login.module.css'

import { useState } from "react";
import Router from "next/router";
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
        Router.push("/");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch(err) {
          console.log(err.response.data.message);
          setError(err.response.data.message);
      }
      // console.log(formData);
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand">Sock Wars</a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="/immunity">Immunities</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/target">Target</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/elimpage">Report Elimination</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/">Leaderboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rules">Rules</a>
                        </li>
                    </ul>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Login</a>
                    </li>
                </div>
            </nav>
            
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
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>

                    <div className={styles.notRegistered}>
                        Not registered? <a href='#'> click here </a>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}