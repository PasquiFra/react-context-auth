import { useGlobal } from '../contexts/GlobalContext'
import { NavLink } from "react-router-dom";

const Footer = () => {
    const { allRoutes } = useGlobal();
    return (
        <ul>
            {
                allRoutes.map(route => {
                    return (
                        <li key={`go-to-${route.name}`}>
                            <NavLink to={route.path} activeclassname="selected">{route.name}</NavLink>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Footer