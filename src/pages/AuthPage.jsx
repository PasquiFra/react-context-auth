import { useLocation } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import Login from '../components/authentication/Login'
import Register from '../components/authentication/Register'

const AuthPage = () => {
    const navigate = useNavigate();
    const { isLogged } = useGlobal()
    const location = useLocation();

    const isLoginPage = location.pathname === '/auth/login';
    const isRegisterPage = location.pathname === '/auth/register';

    useEffect(() => {
        if (!isLogged) {
            navigate('/auth/login');
        }
    }, [isLogged, navigate]);

    return (
        <div>
            {isLoginPage && <Login />}
            {isRegisterPage && <Register />}
        </div>
    )
}

export default AuthPage