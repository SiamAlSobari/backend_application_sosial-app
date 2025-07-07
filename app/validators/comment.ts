import vine from '@vinejs/vine'

export const commentRootValidator = vine.compile(
    vine.object({
        postId: vine.string(),
        comment: vine.string(),
        receiverId: vine.string()
    })
)

export const commentReplyValidator = vine.compile(
    vine.object({
        commentId: vine.string(),
        comment: vine.string(),
        postId: vine.string(),
    })
)