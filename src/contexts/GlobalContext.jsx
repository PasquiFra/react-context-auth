import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const GlobalContext = createContext();

const GlobalState = ({ children }) => {

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null);
    const [previousPage, setPreviousPage] = useState('/');

    const allRoutes = [
        {
            "name": "HomePage",
            "path": "/"
        },
        {
            "name": "Posts List",
            "path": "/posts"
        },
        {
            "name": "Create Post",
            "path": "/posts/create"
        }
    ]

    const fetchData = async () => {
        const categoriesEndpoint = "http://127.0.0.1:3000/categories";
        const tagsEndpoint = "http://127.0.0.1:3000/tags";
        try {
            const categories = await axios.get(categoriesEndpoint);
            const tags = await axios.get(tagsEndpoint);

            console.log("entrato", categories.data, tags.data)
            setCategories(categories.data);
            setTags(tags.data);
        }
        catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <GlobalContext.Provider value={{
            tags,
            categories,
            setError,
            allRoutes,
            setPreviousPage,
            previousPage
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

const useGlobal = () => {
    const value = useContext(GlobalContext);
    //se non sono in un consumer del GlobalContext.Provider, value sarà undefined
    if (value === undefined) {
        throw new Error('Non sei dentro al Global Provider!');
    }
    return value;
}

export { GlobalState, useGlobal }