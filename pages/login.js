import styles from '../styles/login.module.css'

export default function Login() {
    return (
        <div>
            <h1 className={styles.h1}>Welcome to Sock Wars!</h1>

            <div className={styles.rulesContainer}>
                <div className={styles.username}>
                <h2 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", marginTop: "auto", fontSize: "40px"}}>Sign in</h2>
                <label>Username:</label>
                <input type="text" className='form-control' placeholder= "Enter Username" name="username" required></input>
                </div>

                <div className={styles.password}>

                <label>Password:</label>
                <input type="password" className='form-control' placeholder= "Enter Password" name="password" required></input>

                </div>

                <div className={styles.submit}>

                <button type="submit">Login</button>

                </div>

                <div className={styles.notRegistered}>

                Not registered? <a href='#'> click here </a>

                </div>
                
            </div>
            
        </div>
    )
}