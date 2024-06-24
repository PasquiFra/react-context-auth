import { useGlobal } from '../../contexts/AuthContext'


const LoginPage = () => {

    const { login } = useGlobal()

    const handleLogin = event => {
        event.preventDefault();
        console.log(event)
        login(event.payload);
    }

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Email"
            />
            <input
                type="password"
                placeholder="Password"
            />
            <button className="btn btn-success">Effettua il Login</button>
        </form>
    )
}

export default LoginPage