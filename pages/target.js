import styles from '../styles/App.module.css'
import { useState, useEffect } from 'react'
import axios from "axios";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;

export default function Target() {
    const [eliminated, setEliminated] = useState(false)

    useEffect(() => {
        console.log(localStorage)
    });

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
                <div class="form-check" style={{width: "fit-content", margin:"auto"}}>
                    <input type="checkbox" class="form-check-input" checked={eliminated} onChange={e => {setEliminated(!eliminated)}}/>
                    <label class="form-check-label" for="exampleCheck1">I have eliminated my target</label>
                </div>
                <div style={{textAlign:"center"}}>
                    {/*<button type="submit" class="btn btn-secondary btn-sm" style={{backgroundColor:"rgb(45, 64, 83)", marginTop:"10px", marginBottom:"10px"}}>Submit</button>*/}
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmModal"
                        style={{backgroundColor:"rgb(45, 64, 83)", marginTop:"10px", marginBottom:"10px"}}>
                        Submit
                    </button>
                </div>
            </div>
            <div class="modal fade bd-example-modal-sm" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirm elimination</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {eliminated && (
                        <div class="modal-body">
                            Are you sure you have eliminated your target?
                        </div>
                    )}
                    {!eliminated && (
                        <div class="modal-body">
                            Do not confirm an elimination unless you have eliminated your target.
                        </div>
                    )}
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={confirmElim}>Confirm</button>
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