import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
        name: vine.string(),
        email: vine.string(),
        password: vine.string()
    })
)
export const loginValidator = vine.compile(
    vine.object({
        email: vine.string(),
        password: vine.string()
    })
)