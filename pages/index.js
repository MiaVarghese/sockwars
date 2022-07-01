import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/App.module.css";

export default function App() {
  const [APIdata, setAPIdata] = useState([]);

  useEffect(() => {
    axios
      .get("https://sheet.best/api/sheets/fe557b31-4e38-489c-81db-d048fb75d6d8")
      .then((incomingData) => {
        setAPIdata(incomingData.data);
      })
      .catch((err)=> {
        console.log(err.response);
      });
  }, []);

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
              <a class="navbar-brand">Sock Wars</a>
                    
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="/immunity">Immunities</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/target">Target</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Report Elimination</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Leaderboard</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/rules">Rules</a>
                </li>
              </ul>
              <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
              </li>
            </div>
        </nav>

      <h1 className={styles.h1}>SOCK WARS</h1>
      <h3 className={styles.h3}>
        Today's Immunity: Wear 2 Different Color Socks!
      </h3>
      <h2 className={styles.h2}>LEADERBOARD</h2>

      <table className={styles.table}>
        <tr className={styles.trh}>
          <th className={styles.th}>Rank</th>
          <th className={styles.th}>Player</th>
          <th className={styles.th}>Number Eliminated</th>
        </tr>

        {APIdata.map((data) => {
          return (
            <tr className={styles.tr}>
              <td className={styles.td}>{data.Rank}</td>
              <td className={styles.td}>{data.Player}</td>
              <td className={styles.td}>{data.NumberEliminated}</td>
            </tr>
          );
        })}
      </table>

      <table className={styles.table2}>
        <tr className={styles.trh2}>
          <th className={styles.th}>Eliminated Players</th>
          <th className={styles.th}>Date Eliminated</th>
        </tr>
        {APIdata.map((data) => {
          return (
            <tr className={styles.tr2}>
              <td className={styles.td}>{data.EliminatedPlayer}</td>
              <td className={styles.td}>{data.EliminationDate}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
