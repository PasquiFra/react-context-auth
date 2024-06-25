import { createContext, useContext, useEffect, useState } from "react";
import { useGlobal as GlobalContext } from '../contexts/GlobalContext'

import axios from 'axios'

const AuthContext = createContext();
const loginEndpoint = "http://localhost:3000/auth/login"
const registerEndpoint = "http://localhost:3000/auth/register"

const Auth = ({ children }) => {

    const { previousPage, setError, isLogged, setIsLogged } = GlobalContext()

    const login = async (payload) => {
        try {
            const response = await axios.post(loginEndpoint, payload)
            const loginInfo = response.data

            if (response.status === 200) {
                console.log("login successful")
                setIsLogged(true)
            }

            localStorage.setItem('token', loginInfo.token);
            localStorage.setItem('username', JSON.stringify(loginInfo.data.username));
            localStorage.setItem('email', JSON.stringify(loginInfo.data.email));

        } catch (err) {
            console.log("ho un errore", err)
            setError(err.message)
        }
    }

    const register = async (payload) => {
        try {
            const response = await axios.post(registerEndpoint, payload)
            const registerInfo = response.data

            if (response.status === 200) {
                console.log("register successful")
                setIsLogged(true)
            }

            localStorage.setItem('token', registerInfo.token);
            localStorage.setItem('username', JSON.stringify(registerInfo.data.username));
            localStorage.setItem('email', JSON.stringify(registerInfo.data.email));

        } catch (error) {
            setError(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            isLogged,
            setIsLogged,
            login,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const value = useContext(AuthContext);
    //se non sono in un consumer del GlobalContext.Provider, value sarà undefined
    if (value === undefined) {
        throw new Error('Errore nel AuthContext');
    }
    return value;
}

export { Auth, useAuth }