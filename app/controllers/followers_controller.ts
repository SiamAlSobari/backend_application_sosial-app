import Follower from '#models/follower'
import type { HttpContext } from '@adonisjs/core/http'

export default class FollowersController {
  //menampilkan semua user yang follow saya
  public async getFollowingMe({ auth, response }: HttpContext) {
    const follower = await Follower.query()
      .where('following_id', auth.user!.id) //siapa yang follow saya
      .preload('follower', (query) => {
        // preload user yang menjadi follower (yang mengikuti saya),karena follower adalah follower_id relasi dari follower
        query.preload('profile')
      })

    response.status(200).json({
      message: 'Followers fetched successfully',
      data: follower,
    })
  }

  //menampilkan semua user yang saya follow
  public async getMyFollowing({ auth, response }: HttpContext) {
    const following = await Follower.query()
      .where('follower_id', auth.user!.id)
      .preload('following', (query) => {
        query.preload('profile')
      })
    response.status(200).json({
      message: 'Following fetched successfully',
      data: following,
    })
  }
}
