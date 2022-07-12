import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import axios from "axios";

import styles from "../../../styles/profile.module.css";
import EditModal from "../../components/EditModal.js";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/";
const matchEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/match";
const assignEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/users/assignTarget";
const unjoinEndPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/unjoin";

export default function Gamehistory() {
  const [gamehistory, setGamehistory] = useState({}); //the info about the game
  const [gameEdit, setGameEdit] = useState({}); //the game object that will be edited
 
  const [disableJoin, setDisableJoin] = useState(false); //will be used to disable the join button if the game has already started
  const [game, setGame] = useState();
  const [hasJoined, setHasJoined] = useState(false);
  const [lockDate, setLockDate] = useState();

  const { user } = useContext(UserContext);

  const router = useRouter();
  const { _id } = router.query;

  useEffect(() => {
    setUser(JSON.parse(localStorage.user))
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
  }, [_id, user]); //https://stackoverflow.com/questions/53601931/custom-useeffect-second-argument
    //if _id has changed then get new user

  async function fetchGame() {
    try {
      const response = await axios.get(endPoint + _id);
      response.data.shortStartDate = response.data.startDate.substring(0, 10)
      response.data.shortEndDate = response.data.endDate.substring(0, 10)
      const g = response.data
      console.log(g)
      setGamehistory(g);
      setGameEdit(g);
      // setGamehistory(gamehistory => ({
      //   ...gamehistory,
      //   ...g
      // }));
      // setGameEdit(gamehistory => ({
      //   ...gamehistory,
      //   ...g
      // }));
      var current = new Date();
      var gameStart = new Date(response.data.startDate);
      const disable = gameStart < current;
      setDisableJoin(disable); 
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

  const handleDateChange = (e, key) => {
    //console.log(gamehistory)
    setGameEdit((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  }

  const addImmunity = (value) => { 
    setGameEdit((prevState) => ({
      ...prevState,
      immunities: [...prevState.immunities, value]
    }));
  }

  const editImmunity = (e, i) => { //i to track which immunity to edit
    const immunities = gameEdit.immunities.map((imm, idx) => {
      if(idx === i)
        return e.target.value
      else 
        return imm
    })
    setGameEdit((prevState) => ({
      ...prevState,
      immunities: immunities
    }))
  }

  const removeImmunity = (i) => {
    // console.log(i)
    // setGameEdit(prevState => {
    //   const copy = prevState
    //   copy.immunities.splice(i, 1)
    //   console.log(copy)
    //   return copy
    // })
    const immunities = gameEdit.immunities.filter((imm, idx) => idx !== i)
    console.log(immunities)
    setGameEdit((prevState) => ({
        ...prevState,
        immunities: immunities
    }))
  }

  const addActivePlayer = (value) => { 
    const el = gameEdit.eliminatedPlayers.filter((plyr, idx) => plyr.userName === value) 
    if(el.length === 0) { //if player doesnt exist in activePlayers
      const newPlayer = {userName: value}
      setGameEdit((prevState) => ({
        ...prevState,
        activePlayers: [...prevState.activePlayers, newPlayer]
      }));
    }
  }

  const editActivePlayer = (e, i) => { //i to track which player to edit
    const ac = gameEdit.activePlayers.map((plyr, idx) => {
      if(idx === i)
        return {userName: e.target.value}
      else 
        return plyr
    })
    console.log(ac)
    setGameEdit((prevState) => ({
      ...prevState,
      activePlayers: ac
    }))
  }

  const removeActivePlayer = (i) => {
    const ac = gameEdit.activePlayers.filter((plyr, idx) => idx !== i)
    console.log(ac)
    setGameEdit((prevState) => ({
        ...prevState,
        activePlayers: ac
    }))
  }

  const addElimPlayer = (value) => {
    const ac = gameEdit.activePlayers.filter((plyr, idx) => plyr.userName === value) 
    if(ac.length === 0) { //if player doesnt exist in activePlayers
      setGameEdit((prevState) => ({
        ...prevState,
        eliminatedPlayers: [...prevState.eliminatedPlayers, {userName: value}]
      }));
    }
  }

  const editElimPlayer = (e, i) => { //i to track which player to edit
    const el = gameEdit.eliminatedPlayers.map((plyr, idx) => {
      if(idx === i)
        return {userName: e.target.value}
      else 
        return plyr
    })
    setGameEdit((prevState) => ({
      ...prevState,
      eliminatedPlayers: el
    }))
  }

  const removeElimPlayer = (i) => {
    const el = gameEdit.eliminatedPlayers.filter((plyr, idx) => idx !== i)
    setGameEdit((prevState) => ({
        ...prevState,
        eliminatedPlayers: el
    }))
  }

  const submitEdits = () => {
    console.log(gameEdit)
    
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
      {game && lockDate && user && (Object.keys(gamehistory).length !== 0 && Object.keys(gameEdit).length !== 0) ? (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ paddingTop: "50px" }}
        >

          <div
            className="card"
            border="0"
            width="300px"
            style={{ backgroundColor: "rgb(239, 229, 189)"}}
          >
            <EditModal
              gameEdit={gameEdit}
              handleDateChange={handleDateChange}
              addImmunity={addImmunity}
              editImmunity={editImmunity}
              removeImmunity={removeImmunity}
              submitEdits={submitEdits}
              addActivePlayer={addActivePlayer}
              editActivePlayer={editActivePlayer}
              removeActivePlayer={removeActivePlayer}
              addElimPlayer={addElimPlayer}
              editElimPlayer={editElimPlayer}
              removeElimPlayer={removeElimPlayer}
            />
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
