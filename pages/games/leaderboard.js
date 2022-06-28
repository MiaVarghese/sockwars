import styles from "../../styles/confirmelim.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/";

export default function Gamehistory() {
  const [gamehistory, setGamehistory] = useState();
  const [activePlyrs, setActivePlyrs] = useState();

  const router = useRouter();

  useEffect(() => {
    try {
      fetchGamehistory();
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function fetchGamehistory() {
    try {
      const response = await axios.get(endPoint);
      setActivePlyrs(response.data.activePlayers);
      console.log(response.data.activePlayers);
      setGamehistory(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
    }
  }

  return (
    <div>
      {gamehistory ? (
        <div>
          <title>Leaderboard </title>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          ></link>

          <div className={styles.header}>
            <h1>LEADERBOARD</h1>
          </div>
          <div className={styles.box}>
            Game #:
            <h3>{gamehistory._id}</h3>
            {/* <h3>{gamehistory.eliminatedPlayers.username}</h3> */}
            <div className={styles.chart}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Number Eliminated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {activePlyrs.map((activePlyr, index) => (
                        <div>{index+1}</div>
                      ))}
                    </td>
                    <td>
                      {activePlyrs.map((activePlyr) => (
                        <div>{activePlyr.userName}</div>
                      ))}
                    </td>
                    <td>
                      {activePlyrs.map((activePlyr) => (
                        <div>{activePlyr.eliminated}</div>
                      ))}
                    </td>
                  </tr>
                  {/* <tr> */}
                  {/* <td>{gamehistory.eliminatedPlayers}</td>
                    <td>{gamehistory.eliminatedPlayers}</td>
                    <td>{gamehistory.eliminatedPlayers}</td> */}
                  {/* </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
