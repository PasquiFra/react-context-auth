import { createContext, useContext, useEffect, useState } from "react";
import { useGlobal as GlobalContext } from '../contexts/GlobalContext'

import axios from 'axios'

const AuthContext = createContext();
const sendPostEndpoint = "http://localhost:3000/auth/login"

const Auth = ({ children }) => {

    const { previousPage, setError, isLogged, setIsLogged } = GlobalContext()

    const login = async (payload) => {
        try {
            const response = await axios.post(sendPostEndpoint, payload)
            const loginInfo = response.data

            if (response.status === 200) {
                console.log("entrato")
                setIsLogged(true)
            }

            localStorage.setItem('token', loginInfo.token);
            localStorage.setItem('username', JSON.stringify(loginInfo.data.username));
            localStorage.setItem('email', JSON.stringify(loginInfo.data.email));

        } catch (error) {
            setError(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            isLogged,
            setIsLogged,
            login
        }}>
            {children}
        </AuthContext.Provider>
    );
}

const useGlobal = () => {
    const value = useContext(AuthContext);
    //se non sono in un consumer del GlobalContext.Provider, value sarà undefined
    if (value === undefined) {
        throw new Error('Errore nel AuthContext');
    }
    return value;
}

export { Auth, useGlobal }