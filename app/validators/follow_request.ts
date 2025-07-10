import vine from '@vinejs/vine'

export const followRequestValidator = vine.compile(
    vine.object({
        receiverId: vine.string()
    })
)