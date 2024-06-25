import Header from './Header'
import Footer from "./Footer"
import Alert from '../components/Alert/Alert'
import { Outlet, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useGlobal } from '../contexts/GlobalContext';

import axios from "axios";

const DefaultLayout = () => {

    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState({});
    const { error, setError } = useGlobal();

    const fetchPosts = async () => {
        const postsEndpoint = 'http://127.0.0.1:3000/posts'
        try {
            const fetchedPosts = (await axios.get(postsEndpoint)).data.data
            if (fetchedPosts) {
                setPosts(fetchedPosts)
            }
        } catch (err) {
            setError(err.message)
        }
    }

    const fetchPostsImages = async (imageName, slug) => {
        const imagesEndpoint = "http://127.0.0.1:3000/images/";
        try {
            const res = await axios.get(`${imagesEndpoint}${imageName}`, { responseType: 'blob' });
            const image = URL.createObjectURL(res.data)

            // salvataggio delle immagini
            setImages(prevImages => ({ ...prevImages, [slug]: image }));

        } catch (err) {
            console.error("immagine non trovata")
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        posts.forEach(post => {
            if (post.image) {
                fetchPostsImages(post.image, post.slug);
            }
        });
    }, [posts])


    return (
        <>
            <Header></Header>
            <main className='container'>
                <Outlet />
            </main>
            <Footer></Footer>
            <Alert></Alert>
        </>
    )
}

export default DefaultLayout