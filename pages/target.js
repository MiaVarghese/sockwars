import styles from '../styles/App.module.css';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import {GameContext} from "./hooks/GameContext";
import {UserContext} from "./hooks/UserContext";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/notifications/elimination";

export default function Target() {
    const [eliminated, setEliminated] = useState(false)
    const [target, setTarget] = useState();
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
                const targetName = userGame.targets[userGame.targets.length-1];
                const response = await axios.get(URL_PREFIX + "/users/" + targetName);
                setTarget(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function confirmElim() {
        try {
            if (eliminated) {
                const response = await axios.patch(endPoint, {
                    targetId: target._id,
                    userName: user.userName,
                    gameId: currGame._id
                });
                console.log(response);
            }
        } catch(err) {
            console.log(err);
        }
        // try {
        //     if (!eliminated) {
        //         return;
        //     }

        //     const response = axios.patch(URL_PREFIX + "/users/removeTarget", {
        //         gameId: currGame._id,
        //         eliminatorUsername: user.userName,
        //         eliminated: target,
        //     });
        // } catch (err) {
        //     console.log(err);
        // }



        // if(eliminated) {
        //     const gamePlayed = user.gamesPlayed.find(g => { 
        //         return g.gameId === '62ab3acb1278f9a6391cafb6' //hard coded gameId, should be passed
        //     })
        //     console.log(gamePlayed)
        //     axios.get(URL_PREFIX + "/users/" + gamePlayed.targets[gamePlayed.targets.length - 1])
        //     .then((response) => {
        //         axios.patch(URL_PREFIX + "/users/removeTarget", {
        //             gameId: '62ab3acb1278f9a6391cafb6',
        //             eliminatorUsername: user.userName,
        //             eliminated: response.data, //pass the whole object instead of just username
        //             newTarget: "u3" //hard coded new target
        //         })
        //         console.log(response.data)
        //         .then((patchResponse) => {
        //             console.log(patchResponse)
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         });
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     });
        // }
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
                            <a class="nav-link active" aria-current="page" href="#">Target</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Report Elimination</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/">Leaderboard</a>
                        </li>
                    </ul>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                </div>
            </nav>
        <div style={{paddingTop:"10px"}}>
            {!target ?
            <div>Loading </div>
            :
            <div>            
                <div className={styles.rulesContainer}>
                    <h1 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px"}}>Current Target:</h1>

                    <h2 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", paddingBottom: "10px"}}>{target.firstName} {target.lastName}</h2>
                    <div className="form-check" style={{width: "fit-content", margin:"auto"}}>
                        <input type="checkbox" className="form-check-input" checked={eliminated} onChange={e => {setEliminated(!eliminated)}}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">I have eliminated my target</label>
                    </div>
                    <div style={{textAlign:"center"}}>
                        {/*<button type="submit" className="btn btn-secondary btn-sm" style={{backgroundColor:"rgb(45, 64, 83)", marginTop:"10px", marginBottom:"10px"}}>Submit</button>*/}
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmModal"
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
                    <p>1. Dawg One</p>
                    <p>2. Dawg Two</p>
                </div>
            </div>
            }
        </div>
        </div>
    )
}