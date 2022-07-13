import { useState, useEffect } from 'react'
import axios from "axios";
import Link from 'next/link';

import styles from '../../styles/App.module.css'

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;

function ListGames() {
    const [allGames, setGames] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(URL_PREFIX + "/games").then((response) => {
            let games = []
            console.log(response.data)
            for(let i = 0; i < response.data.length; i++) {
                games.push(response.data[i])
                console.log(response.data[i]._id)
                console.log(typeof(response.data[i]._id))
            }
            setGames(games)
        })
        setUser(JSON.parse(localStorage.user))
    }, []);

    return (
        <>
        <h1 style={{textAlign: "center", paddingLeft:"20px", paddingRight: "20px", color:"rgb(239, 229, 189)"}}>Games:</h1>
        <div style={{ margin:"auto", color:"rgb(239, 229, 189)", width: "fit-content"}} class="form-group">
        {allGames.length > 0 && (
            allGames.map((game, idx) => {
                return (
                <div>
                    <Link style={{color:"white"}} href={`/games/${encodeURIComponent(game._id)}`}>
                        <a>Game {idx}</a>
                    </Link> 
                    {/* {user != null && user.role === "admin" && (
                        <Link style={{marginLeft:"10px"}} href={`/games/${encodeURIComponent(game._id)}/immunities`}>
                            <a>Add Immunity</a>
                        </Link> 
                    )} */}
                </div>
                )
            })
        )}
        </div>
        </>
    )
}

export default ListGames