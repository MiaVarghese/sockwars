import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/profile.module.css";

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;
const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/";

export default function Gamehistory() {
  const [gamehistory, setGamehistory] = useState();

  const router = useRouter();
  const { _id } = router.query;

  useEffect(() => {
    try {
      fetchGamehistory();
      //   fetchEliminatedPlyrs();
    } catch (err) {
      console.log(err);
    }
  }, [_id]);

  async function fetchGamehistory() {
    try {
      const response = await axios.get(endPoint + _id);
      switch (response.data.startDate[5] + response.data.startDate[6]) {
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
      }
      setGamehistory(response.data.activePlayers);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const joinGame = () => {
    axios.patch(URL_PREFIX + "/games/join", {
      _id : _id,
      userString: localStorage.user
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error.response)
    });
}

  return (
    <div>
      {gamehistory ? (
        <div
          class="container d-flex justify-content-center align-items-center"
          style={{ paddingTop: "50px" }}
        >
          <div
            class="card"
            border="0"
            width="300px"
            style={{ backgroundColor: "rgb(239, 229, 189)" }}
          >
            <button type="button" class="btn btn-primary" onClick={joinGame}
              style={{backgroundColor:"rgb(45, 64, 83)", marginTop:"3px", marginBottom:"10px"}}>
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
                {gamehistory.startDate} - {gamehistory.endDate}
              </h4>
              <span class="text-muted d-block mb-2">
                Active Players:
                {gamehistory.map((gh) => (
                  <div>{gh.username}</div>
                ))}{" "}
              </span>

              <span class="text-muted d-block mb-2">
                Eliminated Players:
                {/* {gamehistory.eliminatedPlayers} - */}
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
