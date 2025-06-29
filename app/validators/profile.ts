import vine from '@vinejs/vine'

export const updateAvatarProfileValidator = vine.compile(
    vine.object({
        avatar:vine.file({
            size: '10mb',
            extnames: ['jpg', 'png', 'jpeg', 'webp']
        })
    })
)