import { getBaseUrl } from '#config/filename'
import Profile from '#models/profile'
import { ProfilesService } from '#services/profiles_service'
import { updateAvatarProfileValidator } from '#validators/profile'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

@inject()
export default class ProfilesController {
    constructor(
        private readonly profilesService: ProfilesService
    ) {}

    public async getProfile({auth,response}: HttpContext) {
        const profile = await this.profilesService.getProfileByUserId(auth.user!.id)
        response.status(200).json({
            message: 'Profile fetched successfully',
            data: profile
        })
    }

    public async updateAvatarProfile({request,auth}:HttpContext){
        const {avatar} = await request.validateUsing(updateAvatarProfileValidator)
        const profile = await this.profilesService.getProfileByUserId(auth.user!.id)
        await avatar.move(app.makePath('storage/uploads/avatars'),{
            name:`${cuid()}.${avatar.extname}`
        })
        profile.avatar_image = `${getBaseUrl(request)}/uploads/avatars/${avatar.fileName}`
        await profile.save()
        return profile
    }
}