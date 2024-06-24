import PostsList from "../components/Posts/PostsList";

import axios from 'axios'
import { Children, useEffect, useState } from 'react'


const PostsListPage = () => {
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState({});
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        const postsEndpoint = 'http://127.0.0.1:3000/posts'
        try {
            const fetchedPosts = (await axios.get(postsEndpoint)).data.data
            if (fetchedPosts) {
                setPosts(fetchedPosts)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const fetchPostsImages = async (imageName, slug) => {
        const imagesEndpoint = "http://127.0.0.1:3000/images/";
        try {
            const res = await axios.get(`${imagesEndpoint}${imageName}`, { responseType: 'blob' });
            const image = URL.createObjectURL(res.data)

            // salvataggio delle immagini
            setImages(prevImages => ({ ...prevImages, [slug]: image }));

        } catch (error) {
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
        <PostsList posts={posts} images={images}></PostsList>
    )
}

export default PostsListPage