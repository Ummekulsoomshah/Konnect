import React, { useState } from 'react'
import { PostCard,Container } from '../components'
import service from '../appwrite/config'
export default function AllPost() {
    const [posts,setposts]=useState([])
    service.getPosts([]).then((posts)=>{
      if(posts){
        setposts(posts.documents)
      }
    })
  return (
    <div>
      <Container>
        <h1>All Posts</h1>
        <div>
          {posts.map((post)=>{
            <div key={post.$id}>
                <PostCard post={post}/>
            </div>
          })}
        </div>
      </Container>
    </div>
  )
}
