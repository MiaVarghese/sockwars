import styles from '../styles/App.module.css'
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GameContext } from "./hooks/GameContext";

export default function Home() {
    const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/immunity"
    const { currGame } = useContext(GameContext);

    useEffect(() => {
        try {
            if (currGame){
                //console.log(currGame);
                fetchImmunities();
            }
        } catch (err) {
          
            console.log(err);
          
        }
      }, [currGame]);

    async function fetchImmunities() {        
        try {
            //console.log(currGame._id);
            const response = await axios.get(endPoint, {id : currGame._id});
          
            //console.log(response.data);

        } catch (err) {
          console.log(err);
        }
      }

    return (
        <div>
            <h1 className={styles.h1}>SOCK WARS</h1>

            <h2 className={styles.h2}>Today's Immunity: <br /> Wear 2 Different Color Socks!</h2>
            <table className={styles.table2}>
                <tr className={styles.trh2}>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Past Immunity</th>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>03/19/2022</td>
                    <td className={styles.td}>Wear a green shirt!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>02/14/2022</td>
                    <td className={styles.td}>Wear a bagel around your neck on a string!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>02/09/2022</td>
                    <td className={styles.td}>Wear a pink shirt!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>02/01/2022</td>
                    <td className={styles.td}>Wear a yellow shirt!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>01/19/2022</td>
                    <td className={styles.td}>Wear a blue shirt!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>01/08/2022</td>
                    <td className={styles.td}>Wear a red shirt!</td>
                </tr>
            </table>
        </div>
    )
}