import React, { useState, useEffect } from "react";
import axios from "axios";

export const GameContext = React.createContext();
const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/games/recent";

export function GameProvider({ children }) {
    const [currGame, setCurrGame] = useState();
    const [nextGame, setNextGame] = useState();
  
    useEffect(() => {
      fetchRecentGames();
    }, []);
  
    async function fetchRecentGames() {
      try {
        const response = await axios.get(endPoint);
        if (response.data.length===1) {
            setCurrGame(response.data[0]);
        } else if (response.data.length==2) {
            setCurrGame(response.data[0]);
            setNextGame(response.data[1]);
        }

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

