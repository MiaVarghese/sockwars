import styles from '../../../styles/notifications.module.css';

export default function EliminationNotif(props) {

    return (
        <li className="list-group-item" style={{background: "none", color: "white", border: "none"}}>
            <div className="row">
                <div className="col-1 me-5 me-md-4 me-lg-0 text-center">
                    <i className="bi bi-person-circle" style={{fontSize: "45px"}}></i>
                </div>
                <div className="col">
                    <span style={{color: "goldenrod"}}>Person Name</span> 
                    <button type="button" style={{position: "absolute", top: "12px", right: "17px"}} className="btn-sm btn-close btn-close-white"></button>
                    <br/>
                    <span>has eliminated you</span> 
                    <br/>
                    <button className={styles.confirmBtn}>Confirm</button>
                    <button className={styles.denyBtn}>Deny</button>
                    <span className={styles.timeStamp}>{props.time}</span>
                </div>
            </div>
        </li>
    );
}