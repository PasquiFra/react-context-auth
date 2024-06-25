import { useLocation } from 'react-router-dom';

import Login from '../components/authentication/Login'
import Register from '../components/authentication/Register'

const AuthPage = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/auth/login';
    const isRegisterPage = location.pathname === '/auth/register';

    return (
        <div>
            {isLoginPage && <Login />}
            {isRegisterPage && <Register />}
        </div>
    )
}

export default AuthPage