import { useState, useEffect } from 'react'
import axios from "axios";

import styles from '../../styles/App.module.css'

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const matchEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/match";
const createEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/assignTarget";
const notifEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/notifications/sendAll";

function Create() {
    const [allUsers, setUsers] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        /*axios.get(URL_PREFIX + "/users").then((response) => {
            let users = []
            for(let i = 0; i < response.data.length; i++) {
                users.push({
                    id: response.data[i]._id,
                    userName: response.data[i].userName,
                    section: response.data[i].section,
                })
            }
            setUsers(users)
        })*/
        setUser(JSON.parse(localStorage.user))
    }, []);

    const submitGame = () => {
        axios.post(URL_PREFIX + "/games/create", {
            activePlayers: [],
            eliminatedPlayers: [],
            startDate: startDate + ':00',
            endDate: endDate + ':00',
            immunities: []
        })
        .then((response) => {
            console.log(response)
            try {
                matchPlayers(response.data._id, response.data.activePlayers);
            } catch(err) {
                console.log(err);
            }
        })
        .catch((error) => {
            console.log(error.response)
        });
    }

    async function createPlayers(matches, id) {
        const param = {gameId: id, matches: matches}
        try {
            const response = await axios.patch(createEndPoint, param);
            console.log(response.data);
        } catch(err) {
            console.log(err);
            console.log(err.response.data.message);
        }
    }

    async function matchPlayers(id, players) {
        try {
            const response = await axios.post(matchEndPoint, {players: players});
            if (response.data[0]===false) {
                console.log("Could not find a match. Try again later or enter a new distance value.")
            } else {
                createPlayers(response.data, id);
                sendNotification(id);
            }
        } catch(err) {
            console.log(err);
            console.log(err.data.message);
        }
    }

    async function sendNotification(id) {
        const params = {header: "Admin", message: "has created a new game", type: "new game", game: id};

        try {
            const response = await axios.patch(notifEndPoint, params);
            console.log(response);
        } catch (err) {
            console.log(err);
            if (err.response.data.message) {
                console.log(err.response.data.message);
            }
        }
    }

    return (
        <>
        {user != null && user.role === "admin" && (
            <>
            <h1 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", color:"rgb(239, 229, 189)"}}>Create a new game:</h1>
            <p></p>
            <div style={{ margin:"auto", color:"rgb(239, 229, 189)", width: "fit-content"}}>
                <label>Start Date: </label>
                <input
                    type='datetime-local'
                    onChange={e => {
                        console.log(typeof(e.target.value))
                        console.log(e.target.value)
                        setStartDate(e.target.value)
                    }}
                />
            </div>
            <p></p>
            <div style={{ margin:"auto", color:"rgb(239, 229, 189)", width: "fit-content"}}>
                <label>End Date: </label>
                <input
                    type='datetime-local'
                    onChange={e => {
                        console.log(typeof(e.target.value))
                        console.log(e.target.value)
                        setEndDate(e.target.value)
                    }}
                />
            </div>
            <p></p>
            <div style={{ margin:"auto", width: "fit-content"}}>
                <button className="btn btn-primary" onClick={submitGame} style={{backgroundColor:"rgb(239, 229, 189)", color:"black"}}>Create Game</button>
            </div>
            <hr />
            {/* {comments.map(comment => {
                return (
                <div key={comment.id}>
                    {comment.id}. {comment.text}
                    <button onClick={() => deleteComment(comment.id)}>Delete</button>
                </div>
                )
            })} */}
            </>
        )}
        {user != null && user.role === "user" && (
            <div>
                <h2 style={{textAlign: "center", color: "rgb(241, 196, 15)"}}>You are not authorized to access this page</h2>
            </div>
        )}
        </>
    )
}

export default Create