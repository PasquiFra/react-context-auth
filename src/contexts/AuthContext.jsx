import { createContext, useContext, useEffect, useState } from "react";
import { useGlobal as GlobalState } from './GlobalContext'

const AuthContext = createContext();

const Auth = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false)
    const { previousPage } = GlobalState()

    const login = (payload) => {

        navigate(previousPage);
    }

    return (
        <AuthContext.Provider value={{
            isLogged,
            setIsLogged
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