/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import ProfilesController from '#controllers/profiles_controller'
import path, { normalize } from 'path'
import app from '@adonisjs/core/services/app'
import PostsController from '#controllers/posts_controller'
import MediaController from '#controllers/media_controller'


const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/', async () => {
  return {
    hello: 'world',
  }
}).use(middleware.auth())


//api route
router.group(() => {

  // auth route
  router.group(() => {
    router.post('/register', [AuthController, 'register']).use(middleware.guest()),
    router.post('/login', [AuthController, 'login']).use(middleware.guest()),
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
  }).prefix('auth')

  // profile route
  router.group(() => {
    router.get('/', [ProfilesController, 'getProfile']).use(middleware.auth())
    router.patch('/avatar', [ProfilesController, 'updateAvatarProfile']).use(middleware.auth())
    router.patch('/banner', [ProfilesController, 'updateBannerProfile']).use(middleware.auth())
  }).prefix('profiles')

  // post route
  router.group(() => {
    router.post('/', [PostsController, 'createPost']).use(middleware.auth())
  }).prefix('posts')

  // media route
  router.group(() => {
    router.delete('/:id', [MediaController, 'deleteMedia']).use(middleware.auth())
  }).prefix('media')
  
}).prefix('api/v1')



//images route
router.get('/uploads/*', ({ request, response }) => {
const filePath = request.param('*').join(path.sep)
const normalizedPath = normalize(filePath)

if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
  return response.badRequest('Malformed path')
}

const absolutePath = app.makePath('storage/uploads', normalizedPath)
return response.download(absolutePath)
})