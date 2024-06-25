import { useAuth as AuthGlobal } from '../../contexts/AuthContext'
import { useEffect, useState } from "react";
import { useGlobal as GlobalContext } from '../../contexts/GlobalContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { login } = AuthGlobal()
    const { previousPage } = GlobalContext()
    const navigate = useNavigate();

    const defaultFormData = {
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState(defaultFormData);

    const handleInputField = (name, value) => {
        setFormData(current => ({
            ...current,
            [name]: value
        }));
    }

    const handleLogin = event => {
        event.preventDefault();

        login(formData);

        setFormData(defaultFormData)
        navigate(previousPage);
    }

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                name='email'
                placeholder="Email"
                onChange={(event) => handleInputField('email', event.target.value)}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) => handleInputField("password", event.target.value)}
            />
            <button type='submit' className="btn btn-success">Effettua il Login</button>
        </form>
    )
}

export default Login