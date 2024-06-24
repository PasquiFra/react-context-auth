
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';

const SavePreviousPage = () => {
    const { setPreviousPage } = useGlobal();
    const location = useLocation();

    useEffect(() => {
        return () => {
            setPreviousPage(location.pathname);
        };
    }, [location, setPreviousPage]);

    return null;
};

export default SavePreviousPage;