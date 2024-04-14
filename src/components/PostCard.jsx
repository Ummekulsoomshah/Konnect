import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'
function PostCard({$id,title,featuredimg}) {
  return (
   <Link to={`/post/${$id}`}>
    <div>
        <div>
        <img src={service.getFilePreview(featuredimg)} alt="" />
        </div>
        <h2>{title}</h2>
    </div>
   </Link>
  )
}

export default PostCard
