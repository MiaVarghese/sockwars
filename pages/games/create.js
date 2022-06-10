import { useState, useEffect } from 'react'
import axios from "axios";

import styles from '../../styles/App.module.css'

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;

function Create() {
    const [allUsers, setUsers] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        axios.get(URL_PREFIX + "/users").then((response) => {
            let users = []
            for(let i = 0; i < response.data.length; i++) {
                users.push({
                    id: response.data[i]._id,
                    username: response.data[i].username,
                    section: response.data[i].section,
                })
            }
            setUsers(users)
            //console.log(users)
        })
    });

    const submitGame = () => {
        axios.post(URL_PREFIX + "/games/create", {
            activePlayers: allUsers,
            eliminatedPlayers: [],
            startDate: startDate + ':00',
            endDate: endDate + ':00',
            immunities: []
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    return (
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
                <button class="btn btn-primary" onClick={submitGame} style={{backgroundColor:"rgb(239, 229, 189)", color:"black"}}>Create Game</button>
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
    )
}

export default Create