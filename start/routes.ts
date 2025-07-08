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
import LikesController from '#controllers/likes_controller'
import CommentsController from '#controllers/comments_controller'
import BookmarksController from '#controllers/bookmarks_controller'


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
    router.post('/login', [AuthController, 'login']),
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
    router.get('/session', [AuthController, 'getSession']).use(middleware.auth())
  }).prefix('auth')

  // profile route
  router.group(() => {
    router.get('/', [ProfilesController, 'getProfile']).use(middleware.auth())
    router.get('/:id', [ProfilesController, 'getProfileByParam'])
    router.patch('/avatar', [ProfilesController, 'updateAvatarProfile']).use(middleware.auth())
    router.patch('/banner', [ProfilesController, 'updateBannerProfile']).use(middleware.auth())
  }).prefix('profiles')

  // post route
  router.group(() => {
    router.post('/', [PostsController, 'createPost']).use(middleware.auth())
    router.get('/', [PostsController, 'getPosts'])
    router.get('/params/:id', [PostsController, 'getPostByParams'])
  }).prefix('posts')

  // media route
  router.group(() => {
    router.delete('/:id', [MediaController, 'deleteMedia']).use(middleware.auth())
  }).prefix('media')

  // like route
  router.group(() => {
    router.post('/', [LikesController, 'createLike']).use(middleware.auth())
    router.get('/:id', [LikesController, 'getLIkeByPostId'])
    router.delete('/:id', [LikesController, 'deleteLike']).use(middleware.auth())
  }).prefix('likes')

  // comment route
  router.group(() => {
    router.post('/root', [CommentsController, 'createRootComment']).use(middleware.auth())
    router.post('/reply', [CommentsController, 'createReplyComment']).use(middleware.auth())
    router.get('/:id', [CommentsController, 'getNestedCommentByPostId'])
    router.get('/count/:id', [CommentsController, 'getCommentCountByPostId'])
  }).prefix('comments')

  //notification route
  router.group(()=>{
    //notification
  }).prefix('notifications')

  //bookmark route
  router.group(()=>{
    router.post('/',[BookmarksController,'createPostBookmark'])
    router.delete('/:id',[BookmarksController,'deletePostBookmark'])
    router.get('/',[BookmarksController,'getBookmark'])
    router.get('/post/:id',[BookmarksController,'getBookmarkByPostId'])
  }).prefix('bookmarks').use(middleware.auth())

  //

  //endpoints
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