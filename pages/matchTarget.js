import axios from "axios";

const usersEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users";
const matchEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/match";

export default function Target() {
    const players = {
        players: [{"name": "Mary", "section": "trumpet"}, {"name": "Sam", "section": "clarinet"}]
    };

    async function fetchPlayers() {
        try {
            const response = await axios.get(usersEndPoint);
            console.log(response.data);
        } catch(err) {
            console.log(err.data.message);
        }
    }

    async function matchPlayers(e) {
        // e.preventDefault();

        // const p = fetchPlayers();

        try {
            const response = await axios.post(matchEndPoint, players);
            console.log(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={(e)=>matchPlayers(e)} className="btn btn-primary">Match</button>
        </div>
    )
}