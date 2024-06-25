import { useAuth as AuthGlobal } from '../../contexts/AuthContext'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = AuthGlobal()
    const navigate = useNavigate();

    const defaultFormData = {
        username: '',
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

    const handleRegister = event => {
        event.preventDefault();

        register(formData);

        setFormData(defaultFormData)
        navigate("/");
    }

    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                name='username'
                placeholder="username"
                onChange={(event) => handleInputField('username', event.target.value)}
            />
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
};

export default Register