import styles from '../styles/App.module.css';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import {GameContext} from "./hooks/GameContext";
import {UserContext} from "./hooks/UserContext";
import Spinner from "./components/Spinner";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/notifications/elimination";

export default function Target() {
    const [eliminated, setEliminated] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [target, setTarget] = useState();
    const [prevTargets, setPrevTargets] = useState([]);
    const { currGame } = useContext(GameContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user && currGame) {
            getTarget();
        }
    }, [user, currGame]);

    async function getTarget() {
        try {
            var userGame;
            for (var i=0; i<user.gamesPlayed.length; i++) {
                if (user.gamesPlayed[i].gameId===currGame._id) {
                    userGame = user.gamesPlayed[i];
                }
            }

            if (userGame && userGame.isActive) {
                const targetName = userGame.targets.pop();
                setPrevTargets(userGame.targets)
                const response = await axios.get(URL_PREFIX + "/users/" + targetName);
                setTarget(response.data);
            } else {
                setTarget({firstName: "N/A"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function confirmElim() {
        try {
            setSuccess(false);
            setError(false);
            if (eliminated) {
                const response = await axios.patch(endPoint, {
                    targetId: target._id,
                    userName: user.userName,
                    gameId: currGame._id
                });
                console.log(response);
                setSuccess(true);
            }
        } catch(err) {
            setError(true);
            console.log(err);
        }
    }

    return (
        <div style={{paddingTop:"10px"}}>
            {!target ?
            <Spinner />
            :
            <div>        
                {success ?
                    <div className="alert alert-success col-4 mb-3" style={{margin: "auto"}} role="alert">
                        Confirmation request was successfully sent to target!
                    </div>
                :
                    <div></div>
                }   

                {error ?
                    <div class="alert alert-danger col-4 mb-3" style={{margin: "auto"}} role="alert">
                        An error occurred
                    </div>
                :
                    <div></div>
                } 

                <div className={styles.rulesContainer}>
                    <h1 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px"}}>Current Target:</h1>

                    <h2 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", paddingBottom: "10px"}}>{target.firstName} {target.lastName}</h2>
                    <div className="form-check" style={{width: "fit-content", margin:"auto"}}>
                        <input type="checkbox" className="form-check-input" checked={eliminated} onChange={e => {setEliminated(!eliminated)}}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">I have eliminated my target</label>
                    </div>
                    <div style={{textAlign:"center"}}>
                        {/*<button type="submit" className="btn btn-secondary btn-sm" style={{backgroundColor:"rgb(45, 64, 83)", marginTop:"10px", marginBottom:"10px"}}>Submit</button>*/}
                        <button disabled={target.firstName==="N/A"} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmModal"
                            style={{backgroundColor:"rgb(45, 64, 83)", marginTop:"10px", marginBottom:"10px"}}>
                            Submit
                        </button>
                    </div>
                </div>
                <div className="modal fade bd-example-modal-sm" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm elimination</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {eliminated && (
                            <div className="modal-body">
                                Are you sure you have eliminated your target?
                            </div>
                        )}
                        {!eliminated && (
                            <div className="modal-body">
                                Do not confirm an elimination unless you have eliminated your target.
                            </div>
                        )}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={confirmElim}>Confirm</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div style={{color:"rgb(239, 229, 189)", marginLeft:"40%", marginRight: "40%"}}>
                    <h3 style={{textAlign: "center"}}>Previous Targets:</h3>
                    {prevTargets.length===0 ?
                        <div style={{textAlign: "center", color: "white"}}>None</div>
                    :
                        <ol>
                        {prevTargets.map((target) => (
                            <li>{target}</li>
                        ))}
                        </ol>
                    }
                </div>
            </div>
            }
        </div>
    )
}