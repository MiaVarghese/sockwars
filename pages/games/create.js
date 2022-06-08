import { useState, useEffect } from 'react'
import axios from "axios";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;

function Create() {
    const [gameNo, setGameNo] = useState(0)
    const [allUsers, setUsers] = useState([])
    const [activePlayers, setActivePlayers] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [immunities, setImmunities] = useState([])

    useEffect(() => {
        axios.get(URL_PREFIX + "/users").then((response) => {
            const users = response.data
            setUsers(users)
        })
    });

    const submitGame = () => {
        axios.post(URL_PREFIX + "/games/create", {
            activePlayers: [],
            eliminatedPlayers: [],
            startDate: '1995-12-17T03:24:00',//startDate,
            endDate: '1995-12-17T03:24:00',//endDate,
            immunities: []
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const submitGameX = async () => {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                gameNo: 1,
                activePlayers: [],
                eliminatedPlayers: [],
                startDate: startDate,
                endDate: endDate,
                immunities: []
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        //console.log(data)
    }

    return (
        <>
            <div>
                <input
                    type='date'
                    onChange={e => {
                        console.log(typeof(e.target.value))
                        console.log(e.target.value)
                        setStartDate(e.target.value)
                    }}
                />
                <button onClick={submitGame}>Submit comment</button>
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