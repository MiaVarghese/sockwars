import styles from '../styles/App.module.css';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import {GameContext} from "./hooks/GameContext";
import {UserContext} from "./hooks/UserContext";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;

export default function Target() {
    const [eliminated, setEliminated] = useState(false)
    const [user, setUser] = useState();
    const { currGame, nextGame } = useContext(GameContext);
    console.log(currGame);
    const { userName, setUserName } = useContext(UserContext);
    console.log(userName);

    useEffect(() => {
        console.log(userName);
    }, [userName]);

    async function getUser() {
        try {
            const response = await axios.get(URL_PREFIX + "/" + localStorage.userName);
            console.log(response.data);

        } catch (err) {
            console.log(err);
        }
    }

    const confirmElim = () => {
        if(eliminated) {
            const loggedInUser = JSON.parse(localStorage.user)
            const gamePlayed = loggedInUser.gamesPlayed.find(g => { 
                return g.gameId === '62ab3acb1278f9a6391cafb6' //hard coded gameId, should be passed
            })
            console.log(gamePlayed)
            axios.get(URL_PREFIX + "/users/" + gamePlayed.targets[gamePlayed.targets.length - 1])
            .then((eliminated) => {
                axios.patch(URL_PREFIX + "/users/removeTarget", {
                    gameId: '62ab3acb1278f9a6391cafb6',
                    eliminatorUsername: loggedInUser.userName,
                    eliminated: eliminated.data, //pass the whole object instead of just username
                    newTarget: "u3" //hard coded new target
                })
                console.log(eliminated.data)
                .then((patchResponse) => {
                    console.log(patchResponse)
                })
                .catch((error) => {
                    console.log(error)
                });
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }

    return (
        <div style={{paddingTop:"10px"}}>
            <div className={styles.rulesContainer}>
                <h1 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px"}}>Current Target:</h1>

                <h2 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", paddingBottom: "10px"}}>John Doe</h2>
                <div className="form-check" style={{width: "fit-content", margin:"auto"}}>
                    <input type="checkbox" className="form-check-input" checked={eliminated} onChange={e => {setEliminated(!eliminated)}}/>
                    <label className="form-check-label" for="exampleCheck1">I have eliminated my target</label>
                </div>
                <div style={{textAlign:"center"}}>
                    {/*<button type="submit" className="btn btn-secondary btn-sm" style={{backgroundColor:"rgb(45, 64, 83)", marginTop:"10px", marginBottom:"10px"}}>Submit</button>*/}
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmModal"
                        style={{backgroundColor:"rgb(45, 64, 83)", marginTop:"10px", marginBottom:"10px"}}>
                        Submit
                    </button>
                </div>
            </div>
            <div className="modal fade bd-example-modal-sm" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    )
}