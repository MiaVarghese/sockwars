import axios from "axios";
import { useState, useEffect } from "react";

const usersEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users";
const matchEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/match";
const createEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/playerStatus/create";

export default function Target() {
    // const players = {
    //     players: [{"name": "Mary", "section": "trumpet"}, {"name": "Sam", "section": "trumpet"}]
    // };
    const [players, setPlayers] = useState();

    useEffect(() => {
        fetchPlayers();
    }, [])

    async function fetchPlayers() {
        try {
            const response = await axios.get(usersEndPoint);
            setPlayers(response.data);
        } catch(err) {
            console.log(err.data.message);
        }
    }

    async function createPlayers(matches) {
        const param = {gameId: 1, matches: matches}
        try {
            const response = await axios.post(createEndPoint, param);
            console.log(response.data);
        } catch(err) {
            console.log(err);
            console.log(err.data.message);
        }
    }

    async function matchPlayers(e) {
        // e.preventDefault();

        // const players = fetchPlayers();
        // console.log("players", players);

        try {
            // const players = fetchPlayers();
            // console.log(players);
            const response = await axios.post(matchEndPoint, {players: players});
            if (response.data[0]===false) {
                console.log("Could not find a match. Try again later or enter a new distance value.")
            }
            console.log(response.data);

            createPlayers(response.data);
        } catch(err) {
            console.log(err.data.message);
        }
    }

    return (
        <div>
            <button onClick={(e)=>matchPlayers(e)} className="btn btn-primary">Match</button>
        </div>
    )
}