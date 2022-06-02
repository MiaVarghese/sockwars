import styles from '../styles/App.module.css'

export default function Target() {
    return (
        <div style={{paddingTop:"10px"}}>
            <div className={styles.rulesContainer}>
                <h1 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px"}}>Current Target:</h1>

                <h2 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", paddingBottom: "10px"}}>John Doe</h2>
            </div>
            <div style={{color:"rgb(239, 229, 189)", marginLeft:"40%", marginRight: "40%"}}>
                <h3 style={{textAlign: "center"}}>Previous Targets:</h3>
                <p>1. Dawg One</p>
                <p>2. Dawg Two</p>
            </div>
        </div>
    )
}