import Comment from '#models/comment'
import { commentReplyValidator, commentRootValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
    public async createRootComment({request,response,auth}: HttpContext) {
        const payload = await request.validateUsing(commentRootValidator)
        const create = await Comment.create({
            comment: payload.comment,
            postId: payload.postId,
            userId: auth.user!.id,
            parentId: null
        })
        response.status(201).json({
            message: 'Comment created successfully',
            data: create
        })
    }

    public async createReplyComment({request,response,auth}: HttpContext) {
        const payload = await request.validateUsing(commentReplyValidator)
        const create = await Comment.create({
            comment: payload.comment,
            postId: payload.postId,
            userId: auth.user!.id,
            parentId: payload.commentId
        })
        response.status(201).json({
            message: 'Comment created successfully',
            data: create
        })
    }

    public async getNestedCommentByPostId({response,params}:HttpContext){
        const comments = await Comment.query().where('post_id',params.id).orderBy('created_at','desc').preload('user',(query) => {
            query.preload('profile')
        })

        function buildTree(comments:Comment[],parent_id : string | null = null):any{
            return comments
            //filter commertar yang parentId nya null
            .filter((comment:Comment)=> comment.parentId === parent_id)
            //lakukan mapping untuk menyusun tree comments
            .map((comment:Comment)=>({
                //ubah instance comment menjadi object biasa
                ...comment.serialize(),
                //rekursif untuk membangun tree
                replies: buildTree(comments,comment.id)
            }))
        }

        const nested = buildTree(comments)
        response.status(200).json({
            message: 'Comments fetched successfully',
            data: nested
        })
    }

    public async getCommentCountByPostId({response,params}:HttpContext){
        const count = await Comment.query().where('post_id',params.id).count("* as total")
        const parsing = Number(count[0].$extras.total)
        response.status(200).json({
            message: 'Comments count fetched successfully',
            data: parsing
        })
    }
}