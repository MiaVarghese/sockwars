import { useState, useEffect } from "react";
import axios from "axios";
import EliminationNotif from "./components/notifications/EliminationNotif";
import GeneralNotif from "./components/notifications/GeneralNotif";

import styles from "../styles/notifications.module.css";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/accountInfo";

export default function Notifications() {
    const [notifs, setNotifs] = useState();

    useEffect(() => {
        try {
          fetchNotifications();
        } catch (err) {
          console.log(err);
        }
      }, []);
    
      async function fetchNotifications() {
        try {
          const response = await axios.get(endPoint);
          setNotifs(response.data.notifications);
          console.log(response.data.notifications);
        } catch (err) {
          console.log(err);
          if (err.response) {
            console.log(err.response);
          }
        }
      }

    return (
        <div className="container p-5">
            {!notifs ? 
            <div> Loading </div>
            :
            <div className="mx-5 p-3 pb-5" style={{borderRadius: "10px"}}>
                <h2 style={{color: "white"}}>Notifications</h2>

                <div>
                    <ul className="list-group list-group-flush">
                        {notifs.map((notif) => (
                            <div >
                                {notif.type==="elimination" ?
                                    <EliminationNotif/>
                                :
                                    <GeneralNotif type={notif.type} header={notif.header} message={notif.message} time={notif.timeStamp} />
                                }
                                <hr className="m-0" style={{color: "lightgrey"}}></hr>
                            </div>
                        ))}
                        <EliminationNotif/>
                        <hr className="m-0" style={{color: "lightgrey"}}></hr>
                        <GeneralNotif type="immunity" header="Immunity" message="New immunity, [immunity], is in effect" />
                        <hr className="m-0" style={{color: "lightgrey"}}></hr>
                        <GeneralNotif type="target" header="Target" message="Your new target is ready" />
                        <hr className="m-0" style={{color: "lightgrey"}}></hr>
                        <GeneralNotif type="new game" header="Admin" message="has created a new game" />
                        <hr className="m-0" style={{color: "lightgrey"}}></hr>
                    </ul>
                </div>
            </div>
            }
    </div>
    );
}