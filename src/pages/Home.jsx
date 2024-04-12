import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'
function Home() {
    const [posts, setposts] = useState([])
    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setposts(posts.documents)
            }
        })
    }, [])
    if (posts.length === 0) {
        return (
            <div>
                <Container>
                    <h1>Login to read posts</h1>
                </Container>
            </div>
        )
    }
    return (
        <div>
            <Container>
                <h1>All Posts</h1>
                <div>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
