import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import axios from "axios";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/";
const matchEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/match";
const assignEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/assignTarget";
const unjoinEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/unjoin";

export default function Gamehistory() {
  const [game, setGame] = useState();
  const [hasJoined, setHasJoined] = useState(false);
  const [lockDate, setLockDate] = useState();

  const { user } = useContext(UserContext);

  const router = useRouter();
  const { _id } = router.query;

  useEffect(() => {
    try {
      if (_id) {
        if (user) {
          for (var i=0; i<user.gamesPlayed.length; i++) {
            if (user.gamesPlayed[i].gameId===_id) {
              setHasJoined(true);
              console.log("here");
              break;
            }
          }
        }

        fetchGame();
      }
    } catch (err) {
      console.log(err);
    }
  }, [_id, user]);

  async function fetchGame() {
    try {
      const response = await axios.get(endPoint + _id);
      var date = new Date(response.data.startDate);
      date.setDate( date.getDate() - 1 );
      setLockDate(date);
      setGame(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const joinGame = () => {
    axios
      .patch(URL_PREFIX + "/games/join", {
        _id: _id,
        userString: localStorage.user,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  async function unjoin() {
    try {
      const response = await axios.patch(unjoinEndPoint, {gameId: _id, userName: user.userName});
      setHasJoined(false);
      console.log(response.data);
    } catch(err) {
      console.log(err.response.data);
    }
  }

  async function matchPlayers() {
    try {
        console.log(_id);
        const response = await axios.post(matchEndPoint, {gameId: _id});
        if (response.data[0]===false) {
            console.log("Could not find a match. Try again later or enter a new distance value.")
        }
        console.log(response.data);
        assignTargets(response.data);
    } catch(err) {
        console.log(err);
        console.log(err.response);
    }
  }

  async function assignTargets(matches) {
    try {
      const response = await axios.patch(assignEndPoint, {matches: matches, gameId: _id});
      console.log(response.data);
    } catch(err) {
      console.log(err.response.data);
    }
  }

  return (
    <div>
      {game && lockDate && user ? (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ paddingTop: "50px" }}
        >

          <div
            className="card"
            border="0"
            width="300px"
            style={{ backgroundColor: "rgb(239, 229, 189)" }}
          >
            {user.role==="user" ?
              <>
                {hasJoined ?
                <button type="button" className="btn btn-danger" onClick={unjoin} style={{marginTop: "3px", marginBottom: "10px",}} disabled = {new Date() > lockDate}>
                  Leave Game
                </button>
                :
                <button type="button" className="btn btn-primary" onClick={joinGame} style={{backgroundColor: "rgb(45, 64, 83)", marginTop: "3px", marginBottom: "10px",}} disabled = {new Date() > lockDate}>
                  Join Game
                </button>
                }
              </>
            :
              <button type="button" className="btn btn-primary" onClick={matchPlayers} style={{backgroundColor: "rgb(45, 64, 83)", marginTop: "3px", marginBottom: "10px",}} disabled = {new Date() < lockDate || game.status!=="pending"}>
                Match Targets
              </button>
            }
            <div className="upper"></div>
            <span className="text-muted d-block mb-2 text-center">
              <p>Game #: {game._id}</p>
            </span>
            <div className="user text-center">
              <div className="profile" style={{ paddingTop: "10px" }}>
                <img
                  src="https://www.bootdey.com/app/webroot/img/Content/icons/64/PNG/64/tactics.png"
                  width="75"
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <h4 className="mb-0">
                {new Date(game.startDate).toLocaleString()} - {new Date(game.endDate).toLocaleString()}
              </h4>
              <span className="text-muted d-block mb-2">
                Active Players:
                {game.activePlayers.map((player) => (
                  <div key={player.userName}>{player.userName}</div>
                ))}
                {game.activePlayers.length===0 ?
                  <div>None</div>
                  :
                  <div></div>
                }
              </span>

              <span className="text-muted d-block mb-2">
                Eliminated Players:
                {game.eliminatedPlayers.map((player) => (
                  <div key={player.userName}>{player.userName}</div>
                ))}
                {game.eliminatedPlayers.length===0 ?
                  <div>None</div>
                  :
                  <div></div>
                }
              </span>
              <div className="d-flex justify-content-between align-items-center mt-4 px-4"></div>
            </div>
            <div
              className="card"
              border="20"
              style={{ backgroundColor: "rgb(119, 136, 153)" }}
            >
              <h6 className="mb-0">Immunities: </h6>
              {/* <span>{gamehistory.immunities}</span> */}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
