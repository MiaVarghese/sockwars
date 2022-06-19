import { useState, useEffect } from "react";

import styles from '../styles/notifications.module.css'

export default function Notifications() {
    const [notifs, setNotifs] = useState();

    return (
        <div class="container p-5">
            {notifs ? 
            <div> Loading </div>
            :
            <div className="mx-5 p-3 pb-5" style={{borderRadius: "10px"}}>
                <h2 style={{color: "white"}}>Notifications</h2>

                <div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" style={{background: "none", color: "white"}}>
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
                                    <span className={styles.timeStamp}>timestamp</span>
                                </div>
                            </div>
                        </li>
                        <hr className="m-0" style={{color: "lightgrey"}}></hr>
                        <li className="list-group-item" style={{background: "none", color: "white"}}>
                            <div className="row">
                                <div className="col-1 me-5 me-md-4 me-lg-0 text-center">
                                    <i className="bi bi-bandaid" style={{fontSize: "45px", color: "white"}}></i>
                                </div>
                                <div className="col">
                                    <span style={{color: "goldenrod"}}>Immunity</span> 
                                    <button type="button" style={{position: "absolute", top: "12px", right: "17px"}} className="btn-sm btn-close btn-close-white"></button>
                                    <br/>
                                    <span>New immunity, [immunity], is in effect</span> <br/>
                                    <button className={styles.confirmBtn}>View</button>
                                    <span className={styles.timeStamp}>timestamp</span>
                                </div>
                            </div>
                        </li>
                        <hr className="m-0" style={{color: "lightgrey"}}></hr>
                        <li className="list-group-item" style={{background: "none", color: "white"}}>
                            <div className="row">
                                <div className="col-1 me-5 me-md-4 me-lg-0 text-center">
                                    <i className="bi bi-person-circle" style={{fontSize: "45px", color: "white"}}></i>
                                </div>
                                <div className="col">
                                    <span style={{color: "goldenrod"}}>Target</span> 
                                    <button type="button" style={{position: "absolute", top: "12px", right: "17px"}} className="btn-sm btn-close btn-close-white"></button>
                                    <br/>
                                    <span>Your new target is ready</span> <br/>
                                    <button className={styles.confirmBtn}>View</button>
                                    <span className={styles.timeStamp}>timestamp</span>
                                </div>
                            </div>
                        </li>
                        <hr className="m-0" style={{color: "lightgrey"}}></hr>
                        <li className="list-group-item" style={{background: "none", color: "white"}}>
                            <div className="row">
                                <div className="col-1 me-5 me-md-4 me-lg-0 text-center">
                                    <i className="bi bi-joystick" style={{fontSize: "45px", color: "white"}}></i>
                                </div>
                                <div className="col">
                                    <span style={{color: "goldenrod"}}>Admin</span> 
                                    <button type="button" style={{position: "absolute", top: "12px", right: "17px"}} className="btn-sm btn-close btn-close-white"></button>
                                    <br/>
                                    <span>has created a new game</span> <br/>
                                    <button className={styles.confirmBtn}>View</button>
                                    <span className={styles.timeStamp}>timestamp</span>
                                </div>
                            </div>
                        </li>
                        <hr className="m-0" style={{color: "lightgrey"}}></hr>
                    </ul>
                </div>
            </div>
            }
    </div>
    );
}