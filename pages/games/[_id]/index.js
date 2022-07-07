import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../../styles/profile.module.css";
import EditModal from "../../components/EditModal.js";
const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/";

export default function Gamehistory() {
  const [gamehistory, setGamehistory] = useState(); //the info about the game
  const [gameEdit, setGameEdit] = useState(); //the game object that will be edited
  const [user, setUser] = useState({});
  const [disableJoin, setDisableJoin] = useState(false); //will be used to disable the join button if the game has already started

  const router = useRouter();
  const { _id } = router.query;

  useEffect(() => {
    setUser(JSON.parse(localStorage.user))
    try {
      console.log(_id)
      fetchGamehistory();
      //   fetchEliminatedPlyrs();
    } catch (err) {
      console.log(err);
    }
  }, [_id]); //https://stackoverflow.com/questions/53601931/custom-useeffect-second-argument
    //if _id has changed then get new user

  async function fetchGamehistory() {
    try {
      const response = await axios.get(endPoint + _id);
      /*switch (response.data.startDate[5] + response.data.startDate[6]) {
        case "01":
          response.data.startDate =
            "Jan. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "02":
          response.data.startDate =
            "Feb. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "03":
          response.data.startDate =
            "Mar. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "04":
          response.data.startDate =
            "Apr. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "05":
          response.data.startDate =
            "May " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "06":
          response.data.startDate =
            "Jun. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "07":
          response.data.startDate =
            "Jul. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "08":
          response.data.startDate =
            "Aug. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "09":
          response.data.startDate =
            "Sep " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "10":
          response.data.startDate =
            "Oct. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
        case "11":
          response.data.startDate =
            "Nov. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        case "12":
          response.data.startDate =
            "Dec. " +
            response.data.startDate[8] +
            response.data.startDate[9] +
            ", " +
            response.data.startDate[0] +
            response.data.startDate[1] +
            response.data.startDate[2] +
            response.data.startDate[3];
          break;
        default:
          break;
      }
      switch (response.data.endDate[5] + response.data.endDate[6]) {
        case "01":
          response.data.endDate =
            "Jan. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "02":
          response.data.endDate =
            "Feb. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "03":
          response.data.endDate =
            "Mar. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "04":
          response.data.endDate =
            "Apr. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "05":
          response.data.endDate =
            "May " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "06":
          response.data.endDate =
            "Jun. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "07":
          response.data.endDate =
            "Jul. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "08":
          response.data.endDate =
            "Aug. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "09":
          response.data.endDate =
            "Sep " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "10":
          response.data.endDate =
            "Oct. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
        case "11":
          response.data.endDate =
            "Nov. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        case "12":
          response.data.endDate =
            "Dec. " +
            response.data.endDate[8] +
            response.data.endDate[9] +
            ", " +
            response.data.endDate[0] +
            response.data.endDate[1] +
            response.data.endDate[2] +
            response.data.endDate[3];
          break;
        default:
          break;
      }*/ 
      response.data.shortStartDate = response.data.startDate.substring(0, 10)
      response.data.shortEndDate = response.data.endDate.substring(0, 10)
      console.log(response.data)
      setGamehistory(response.data);
      setGameEdit(response.data);
      var current = new Date();
      var gameStart = new Date(response.data.startDate);
      const disable = gameStart < current;
      setDisableJoin(disable); 
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

  const handleChange = (e, key) => {
    console.log(gamehistory)
    setGameEdit((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  }

  return (
    <div>
      {gamehistory && gameEdit ? (
        <div
          class="container d-flex justify-content-center align-items-center"
          style={{ paddingTop: "50px" }}
        >
          <div
            class="card"
            border="0"
            width="300px"
            style={{ backgroundColor: "rgb(239, 229, 189)"}}
          >
            <EditModal
              gameEdit={gameEdit}
              handleChange={handleChange}
            />
            <button
              type="button"
              class="btn btn-primary btn-sm"
              onClick={joinGame}
              style={{
                backgroundColor: "rgb(45, 64, 83)",
                marginTop: "3px",
                marginBottom: "10px",
                width: "100px"
              }}
              disabled={disableJoin}
            >
              Join Game
            </button>
            <div class="upper"></div>
            <span class="text-muted d-block mb-2 text-center">
              <p>Game #: {gamehistory._id}</p>
            </span>
            <div class="user text-center">
              <div class="profile" style={{ paddingTop: "10px" }}>
                <img
                  src="https://www.bootdey.com/app/webroot/img/Content/icons/64/PNG/64/tactics.png"
                  width="75"
                />
              </div>
            </div>
            <div class="mt-5 text-center">
              <h4 class="mb-0">
                {gamehistory.shortStartDate} - {gamehistory.shortEndDate}
              </h4>
              <span class="text-muted d-block mb-2">
                Active Players:
                {gamehistory.activePlayers.map((gh) => (
                  <div>{gh.username}</div>
                ))}{" "}
              </span>

              <span class="text-muted d-block mb-2">
                Eliminated Players:
                {gamehistory.eliminatedPlayers.map((gh) => (
                  <div>{gh.username}</div>
                ))}{" "}
              </span>
              <div class="d-flex justify-content-between align-items-center mt-4 px-4"></div>
            </div>
            <div
              class="card"
              border="20"
              style={{ backgroundColor: "rgb(119, 136, 153)" }}
            >
              <h6 class="mb-0">Immunities: </h6>
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
