import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async getUsersNotFollowing({ response, auth }: HttpContext) {
    //mencari user selain saya dan selain yg belum saya follow
    const user = await User.query()
      .whereNot('id', auth.user!.id)
      .whereDoesntHave('followers', (query) => { //siapa yang follow user x ini
        query.where('follower_id', auth.user!.id) //jika saya follow user x maka user tidak akan ditampilkan
      })
      .preload('profile')
    response.status(200).json({
      message: 'Users fetched successfully',
      data: user,
    })
  }
  
}
