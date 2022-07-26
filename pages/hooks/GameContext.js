import React, { useState, useEffect } from "react";
import axios from "axios";

export const GameContext = React.createContext();
const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/recent";

export function GameProvider({ children }) {
    const [prevGame, setPrevGame] = useState();
    const [currGame, setCurrGame] = useState();
    const [nextGame, setNextGame] = useState();
  
    useEffect(() => {
      fetchRecentGames();
    }, []);
  
    async function fetchRecentGames() {
      try {
        const response = await axios.get(endPoint);
        setPrevGame(response.data.prev);
        setCurrGame(response.data.curr);
        setNextGame(response.data.next);

        console.log(response.data);
      } catch(err) {
        console.log(err);
        if (err.response) {
          console.log(err.response);
        }
      }
    }

    return (
        <GameContext.Provider value={{currGame, setCurrGame, nextGame, setNextGame}} >
            {children}
        </GameContext.Provider>
    )
}

