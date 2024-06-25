import { useGlobal } from '../contexts/GlobalContext'
import { NavLink, Link } from "react-router-dom";

const Header = () => {
    const { allRoutes, isLogged } = useGlobal();
    return (
        <nav className='d-flex'>
            <h1 className="m-4">React Form Blog</h1>
            <ul className='d-flex'>
                {
                    allRoutes.map(route => {
                        return (
                            <li key={`go-to-${route.name}`}
                                className='m-3'>
                                <NavLink to={route.path} activeclassname="selected">{route.name}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                {
                    isLogged ?
                        <Link to={'auth/logout'} className='btn btn-danger'>Logout</Link>
                        :
                        <Link to={'auth/login'} className='btn btn-primary'>Login</Link>
                }
                <Link to={'auth/register'} className='btn btn-secondary'>Register</Link>
            </div>
        </nav>
    )
}

export default Header