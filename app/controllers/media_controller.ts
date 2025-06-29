import Media from '#models/media'
import type { HttpContext } from '@adonisjs/core/http'

export default class MediaController {
    public async deleteMedia({params,response}: HttpContext) {
        const media = await Media.findOrFail(params.id)
        await media.delete()
        response.status(200).json({
            message: 'Media deleted successfully',
            data: media
        })
    }
}