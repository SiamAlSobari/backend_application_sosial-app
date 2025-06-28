import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
        name: vine.string(),
        email: vine.string(),
        password: vine.string()
    })
)