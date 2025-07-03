import vine from '@vinejs/vine'

export const likeValidator = vine.compile(
    vine.object({
        postId: vine.string()
    })
)