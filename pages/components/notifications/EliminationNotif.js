import styles from '../../../styles/notifications.module.css';

import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../hooks/UserContext";

const confirmEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/removeTarget";
const deleteEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/notifications/delete";

export default function EliminationNotif(props) {

    const { user } = useContext(UserContext);

    async function confirmElimination() {
        try {
            // gameId, eliminatorUsername, eliminated, newTarget
            var newTarget;
            for (var i=0; i<user.gamesPlayed.length; i++) {
                if (user.gamesPlayed[i].gameId===props.gameId) {
                    const targetList = user.gamesPlayed[i].targets
                    newTarget = targetList[targetList.length-1];
                    break;
                }
            }

            const params = {
                gameId: props.gameId,
                eliminatorUsername: props.header,
                eliminated: user,
                newTarget: newTarget
            }

            const response = await axios.patch(confirmEndPoint, params);
            console.log(response);
            deleteNotification();
        } catch(err) {
            console.log(err);
        }
    }

    async function deleteNotification() {
        try {
            const response = await axios.patch(deleteEndPoint, {userName: user.userName, id: props.id});
            console.log(response);
        } catch(err) {
            console.log(err.response.data);
        }
    }

    return (
        <li key={props.id} className="list-group-item" style={{background: "none", color: "white", border: "none"}}>
            <div className="row">
                <div className="col-1 me-5 me-md-4 me-lg-0 text-center">
                    <i className="bi bi-person-circle" style={{fontSize: "45px"}}></i>
                </div>
                <div className="col">
                    <span style={{color: "goldenrod"}}>{props.header}</span> 
                    <button type="button" style={{position: "absolute", top: "12px", right: "17px"}} className="btn-sm btn-close btn-close-white"></button>
                    <br/>
                    <span>has eliminated you</span> 
                    <br/>
                    <button className={styles.confirmBtn} onClick={()=>confirmElimination("confirm")}>Confirm</button>
                    <button className={styles.denyBtn} onClick={()=>deleteNotification()}>Deny</button>
                    <span className={styles.timeStamp}>{props.time}</span>
                    {props.id}
                </div>
            </div>
        </li>
    );
}