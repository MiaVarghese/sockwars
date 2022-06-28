import styles from "../../styles/confirmelim.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/";

export default function Gamehistory() {
  const [gamehistory, setGamehistory] = useState();
  const [eliminatedPlyrs, setEliminatedPlyrs] = useState();

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
      setEliminatedPlyrs(response.data.eliminatedPlayers);
      console.log(response.data.eliminatedPlayers);
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
          <title>Confirmed Eliminations</title>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          ></link>

          <div className={styles.header}>
            <h1>Confirmed Eliminations</h1>
          </div>
          <div className={styles.box}>
            Game #:
            <h3>{gamehistory._id}</h3>
            {/* <h3>{gamehistory.eliminatedPlayers.username}</h3> */}
            <div className={styles.chart}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Player</th>
                    <th>Section</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <td>
                      <div>
                        {eliminatedPlyrs.map((eliminatedPlyr) => (
                          <div>{eliminatedPlyr.id}</div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div>
                        {eliminatedPlyrs.map((eliminatedPlyr) => (
                          <div>{eliminatedPlyr.username}</div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div>
                        {eliminatedPlyrs.map((eliminatedPlyr) => (
                          <div>{eliminatedPlyr.section}</div>
                        ))}
                      </div>
                    </td>
                  </tr> */}
                  <tr>
                    <td>
                      {eliminatedPlyrs.map((eliminatedPlyr) => (
                        <div>{eliminatedPlyr.id}</div>
                      ))}
                    </td>
                    <td>
                      {eliminatedPlyrs.map((eliminatedPlyr) => (
                        <div>{eliminatedPlyr.username}</div>
                      ))}
                    </td>
                    <td>
                      {eliminatedPlyrs.map((eliminatedPlyr) => (
                        <div>{eliminatedPlyr.eliminated}</div>
                      ))}
                    </td>
                  </tr>
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
