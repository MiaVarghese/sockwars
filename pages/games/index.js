import { useState, useEffect } from 'react'
import axios from "axios";
import Link from 'next/link';

import styles from '../../styles/App.module.css'

const URL_PREFIX = process.env.NEXT_PUBLIC_REACT_APP_URL;

function ListGames() {
    const [allGames, setGames] = useState([])

    useEffect(() => {
        axios.get(URL_PREFIX + "/games").then((response) => {
            let games = []
            console.log(response.data)
            for(let i = 0; i < response.data.length; i++) {
                games.push(response.data[i])
            }
            setGames(games)
        })
    }, []);

    return (
        <>
        {allGames.length > 0 && (
            allGames.map((game, idx) => {
                return (
                <div>
                    <Link href="/games/{game._id}">
                        <a>Game {idx}</a>
                    </Link>
                </div>
                )
            })
        )}
        </>
    )
}

export default ListGames