import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setpost] = useState(null)
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setpost(post)
                } else {
                    navigate('/')
                }
            })
        }
    }, [slug, navigate])

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }
    return post ? (
        <div>
            <Container>
                <div>
                    <h1>{post.title}</h1>
                    <img src={service.getFilePreview(post.featuredImage)} alt={post.title} />

                    {isAuthor && (
                        <div>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button onClick={deletePost}>Delete</Button>
                        </div>
                    )}
                </div>
                <div>
                    <h1>{post.title}</h1>
                    <div>{parse(post.content)}</div>
                </div>
            </Container>
        </div>
    ) : null
}

export default Post
