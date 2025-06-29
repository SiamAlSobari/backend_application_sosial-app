import Profile from '#models/profile'
import { ProfilesService } from '#services/profiles_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProfilesController {
    constructor(
        private readonly profilesService: ProfilesService
    ) {}

    public async getProfile({auth}: HttpContext) {
        const profile = await this.profilesService.getProfileByUserId(auth.user!.id)
        return profile
    }
}