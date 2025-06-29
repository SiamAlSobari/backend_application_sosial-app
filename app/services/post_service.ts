import { getBaseUrl } from "#config/filename";
import Post from "#models/post";
import { inject } from "@adonisjs/core";
import { MultipartFile } from "@adonisjs/core/bodyparser";
import { cuid } from "@adonisjs/core/helpers";
import app from "@adonisjs/core/services/app";

@inject()
export class PostService {

    public async createPostWithMedia(
        userId: string,
        caption: string,
        mediaFiles: MultipartFile[],
        request?:any
    ){
        const post = await Post.create({
            caption:caption,
            userId:userId
        })
        if (mediaFiles){
            for (const media of mediaFiles) {
                await media.move(app.makePath('storage/uploads/posts'),{
                    name:`${cuid()}.${media.extname}`
                })
                await post.related('media').create({
                    url:`${getBaseUrl(request)}/uploads/posts/${media.fileName}`,
                    type:media.extname
                })
            }
        }
        await post.load('media')
        return post
    }
}