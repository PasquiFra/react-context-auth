import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobal } from '../contexts/GlobalContext'

import axios from 'axios'

const ShowPostPage = () => {

    const { slug } = useParams();

    const { setError } = useGlobal();

    const defaultPost = {
        title: "",
        content: "",
        image: null,
        category: '',
        tags: [],
        published: false,
        userId: 1
    }

    const [post, setPost] = useState(defaultPost);
    const [image, setImage] = useState({});

    const fetchPost = async () => {
        const postEndpoint = `http://127.0.0.1:3000/posts/${slug}`
        try {
            const post = (await axios.get(postEndpoint)).data
            const fetchedPost = {
                title: post.title,
                content: post.content,
                image: post.image,
                category: post.category,
                tags: post.tags,
                published: post.published,
                userId: post.userId
            }
            setPost(fetchedPost)

            console.log(post)
        } catch (error) {
            setError(error.message)
        }
    }

    const fetchPostImage = async (imageName, slug) => {
        const imagesEndpoint = "http://127.0.0.1:3000/images/";
        try {
            const res = await axios.get(`${imagesEndpoint}${imageName}`, { responseType: 'blob' });
            const image = URL.createObjectURL(res.data)

            // salvataggio di una singola immagine
            setImage(() => ({ [slug]: image }));

        } catch (error) {
            console.error("immagine non trovata")
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

    useEffect(() => {

        if (post.image) {
            fetchPostImage(post.image, post.slug);
        }

    }, [post])

    return (
        <div>
            <h3>{post.title}</h3>
            <p>
                {post.content}
            </p>
            <div>
                <strong>Categoria:</strong>
                {post.category.name}
            </div>
            <div>
                <strong>Tags:</strong>
                {
                    post.tags.map((tag, index) => {
                        return (
                            <span
                                key={`tag-${tag.name}-${index}`}
                                className="mx-2">
                                {tag.name}
                            </span>
                        )
                    })
                }
            </div>
            <figure>
                <img src={image[post.slug]} alt={`foto-post-${post.index}`} />
            </figure>
        </div>
    )
}

export default ShowPostPage