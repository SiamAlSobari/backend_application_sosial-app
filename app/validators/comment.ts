import vine from '@vinejs/vine'

export const commentRootValidator = vine.compile(
    vine.object({
        postId: vine.string(),
        comment: vine.string()
    })
)