import React, { useState, useEffect } from "react";
import axios from "axios";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [userName, setUserName] = useState();

    useEffect(() => {
        getUser();
    }, [])

    async function getUser() {
        try {
            const response = axios.get(process.env.NEXT_PUBLIC_REACT_APP_URL + "/auth/verify");
            setUserName(response.data);
        } catch (err) {
            if (err.response) {
                console.log(err.response);
            } else {
                console.log(err);
            }
        }
    }

    return (
        <UserContext.Provider value={{userName, setUserName}} >
            {children}
        </UserContext.Provider>
    )
}