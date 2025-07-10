import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    public async getAllUsersNotFollowing({response,auth}: HttpContext) {
        //mencari user selain saya dan selain yg belum saya follow
        const user = await User.query().whereNot('id',auth.user!.id).preload('profile').whereDoesntHave('followers', (query) => {
            query.where('follower_id', auth.user!.id)
        }).preload('profile')
        response.status(200).json({
            message: 'Users fetched successfully',
            data: user
        })
    }
}