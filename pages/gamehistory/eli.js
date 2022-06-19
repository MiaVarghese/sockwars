//////////// confirm elim page /////////////

import styles from "../../styles/confirmelim.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/";

export default function Gamehistory() {
  const [eliminatedPlyrs, setEliminatedPlyrs] = useState();
  const [gamehistory, setGamehistory] = useState();

  const router = useRouter();
  const { _id } = router.query;

  useEffect(() => {
    try {
      fetchGamehistory();
    } catch (err) {
      console.log(err);
    }
  }, [_id]);

  async function fetchGamehistory() {
    try {
      const response = await axios.get(endPoint + _id);
      setEliminatedPlyrs(response.data.eliminatedPlayers);
      console.log(response.data.eliminatedPlayers);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
    }
  }

  async function fetchElimplayers() {
    try {
      const response = await axios.get(endPoint + _id);
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
      {eliminatedPlyrs || gamehistory ? (
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
            <h3>
              <div>{gamehistory._id}</div>
            </h3>
            <div className={styles.chart}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Section</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
