import './alert.scss'
import { useGlobal } from '../../contexts/GlobalContext';
import { useEffect, useState } from "react";

const Alert = () => {
    const [dismiss, setDismiss] = useState(false)
    const { error, setError } = useGlobal();

    const dismissAlert = () => {
        setDismiss(true)
        setError(null)
    }

    useEffect(() => {
        if (error) {
            setDismiss(false);
        }
    }, [error])

    if (!error) {
        return null;
    }

    return (
        <div className={`alert ${dismiss === true ? 'close' : ''}`}>
            <ul>
                <li>{error}</li>
            </ul>
            <button className='btn btn-danger' onClick={dismissAlert}>Dismiss</button>
        </div>
    )
}

export default Alert