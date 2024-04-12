import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, Select, RTE } from '../index'
import service from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'draft',

        },
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.userData)
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null

            if (file) {
                service.deleteFile(post.featuredImage)
            }
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,

            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await service.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id.data.featuredImage = fileId
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)

                }
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim
                .toLowerCase()
                .replace(/[^a-z0-9-]+/g, '')
                .replace(/\s/g, '-')
            return ""
        }
    },[])

    useEffect(()=>{
        const subcription=watch((value,{name})=>{
            if(name==="title"){
                setValue("slug",slugTransform(value.title,
                {shouldValidate:true}))
            }
        })
        return ()=>subcription.unsubscribe()
    },[watch,setValue,slugTransform])

return(
    <form onSubmit={handleSubmit(submit)}>
        <Input
            label="Title"
            placeholder="Title"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug"
            placeholder="Slug"
            {...register("slug", { required: true })}
            onInput={(e)=>{
                setValue("slug",slugTransform(e.currentTarget.value),{
                    shouldValidate:true,
                
                })

            }}
        />
        <RTE
            label="Content" name="content" control={control}

            defaultValue={getValues("content")}
        />
        <Input
            label="featured Image"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            {...register("image",{required:!post})}
        />
        {post && (
            <img src={service.getFilePreview(post.featuredImage)} alt={post.title} />
        )}
        <Select
        options={["active","inactive"]}
            label="Status"
            {...register("status", { required: true })}
        />
        <Button type="submit">{post ? "Update" : "Submit"}</Button>
    </form>
)
}
export default PostForm
