import React, { useState, useEffect } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const endPoint = process.env.NEXT_PUBLIC_REACT_APP_URL + "/auth/verify";

export function UserProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        getUser();
    }, [])

    async function getUser() {
        try {
            const response = await axios.get(endPoint);
            setUser(response.data);
        } catch (err) {
            if (err.response) {
                console.log(err.response);
            } else {
                console.log(err);
            }
        }
    }

    return (
        <UserContext.Provider value={{user, setUser}} >
            {children}
        </UserContext.Provider>
    )
}