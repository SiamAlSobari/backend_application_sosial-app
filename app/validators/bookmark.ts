import vine from '@vinejs/vine'

export const createPostBookmarkValidator = vine.compile(
    vine.object({
        postId: vine.string(),
    })
)