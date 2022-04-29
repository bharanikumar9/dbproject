import React, { useState, useEffect } from 'react'
const axios = require('axios')

export const GlobalContext = React.createContext();


const GlobalContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [fetchingUser, setFetchingUser] = useState(true)
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    useEffect(() => {
        axios
            .post('http://localhost:5000/fetch-user', null, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                console.log(`Fetched session for user: ${response.data.user}`)
                console.log(response.data)
                setUser(response.data.user)
            })
            .catch((error) => {
                console.log(`No user exists with the current session... ${error}`)
                setUser("bk")
            })
            .finally(() => {
                setFetchingUser(false)
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                user: user,
                setUser: setUser,
                fetchingUser: fetchingUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}


// export default GlobalContextProvider
export default GlobalContextProvider

