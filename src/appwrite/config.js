import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    Client = new Client();
    databases;
    bucket;
    constructor() {
        this.Client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid)
        this.databases = new Databases(this.Client)
        this.bucket = new Storage(this.Client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try{
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(error){
          console.log("createpost: ",error)
        }

    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try{
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
              slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(error){
          console.log("updatepost: ",error)
        }

    }

    async deletePost(slug) {
        try{
            return await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
              slug
            )
        }
        catch(error){
           console.log("deletepost: ",error)
           return false
        }

    }

    async getPost(slug) {
        try{
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
              slug
            )
        }
        catch(error){
            console.log("getpost: ",error)
        }

    }

    async getPosts(queries=[Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                queries
            )
        } catch (error) {
            console.log("getposts: ",error)
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("upload file: ",error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwritebucketid,
                fileId
            )
        } catch (error) {
            console.log("deletefile: ",error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwritebucketid,
            fileId
        )
    }
}

const service = new Service()
export default service