import vine from '@vinejs/vine'

export const updateAvatarProfileValidator = vine.compile(
    vine.object({
        avatar:vine.file({
            size: '40mb',
            extnames: ['jpg', 'png', 'jpeg', 'webp']
        })
    })
)

export const updateBannerProfileValidator = vine.compile(
    vine.object({
        banner:vine.file({
            size: '10mb',
            extnames: ['jpg', 'png', 'jpeg', 'webp']
        })
    })
)