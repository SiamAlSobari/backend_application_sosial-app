import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
    vine.object({
        caption: vine.string(),
        media: vine.array(
            vine.file({
                size: '300mb',
                extnames: ['jpg', 'png', 'jpeg', 'webp', 'mp4', 'mov']
            })
        )
    })
)