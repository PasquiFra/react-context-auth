import './posts.scss'
import { useNavigate, Link } from 'react-router-dom';

const PostsList = ({ posts, images }) => {

    const navigate = useNavigate();

    const abstract = (post) => {
        return post.split(' ').slice(0, 50).join(' ')
    }

    return (
        <div>
            <ul id="posts-list">
                {/* stampa dei posts */}
                {
                    posts.map((post, index) => {
                        return (
                            <li key={`post-${index}`} >
                                <h3>{post.title}</h3>
                                <p>
                                    {abstract(post.content)}
                                    <Link to={`/posts/${post.slug}`} ><strong>...Read more</strong></Link>
                                </p>
                                <div>
                                    <strong>Categoria:</strong>{post.category.name}
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
                                    <img src={images[post.slug]} alt={`foto-post-${post.index}`} />
                                </figure>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default PostsList