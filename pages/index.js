import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/App.module.css';


export default function App() {
    const [APIdata, setAPIdata] = useState([]);


    useEffect(() => {
        axios.get('https://sheet.best/api/sheets/fe557b31-4e38-489c-81db-d048fb75d6d8')
            .then((incomingData) => {
                setAPIdata(incomingData.data);
            })
    }, [])

    return (
        <div>

<h1 className={styles.h1}>SOCK WARS</h1>
<h3 className={styles.h3}>Today's Immunity: Wear 2 Different Color Socks!</h3>
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

                )
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
                )
            })}
                                    </table>

        </div>
    )
}