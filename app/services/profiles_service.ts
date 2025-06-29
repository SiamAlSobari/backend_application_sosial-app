import Profile from "#models/profile";
import { inject } from "@adonisjs/core";

@inject()
export class ProfilesService {

    public async getProfileByUserId(userId: string) {
        const profile = await Profile.query().where('user_id',userId).firstOrFail()
        return profile
    }
}