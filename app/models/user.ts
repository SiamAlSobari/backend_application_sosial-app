import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany, hasOne} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { randomUUID } from 'crypto'
import Profile from './profile.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import Like from './like.js'
import Comment from './comment.js'
import Notification from './notification.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Relation to Profile
  @hasOne(() => Profile, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  declare profile: HasOne<typeof Profile>


  // Relation to Post
  @hasMany(() => Post, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  declare posts: HasMany<typeof Post>

  // Relation to Like
  @hasMany(()=> Like, {
    foreignKey: 'userId',
    localKey: 'id'
  })
  declare likes: HasMany<typeof Like>

  @hasMany(()=> Comment, {
    foreignKey: 'userId',
    localKey: 'id'
  })
  declare comments: HasMany<typeof Comment>

  // Relation Sender to Nofication
  @hasMany(()=>Notification, {
    foreignKey: 'senderId',
    localKey: 'id'
  })
  declare sentNotifications: HasMany<typeof Notification>

  // Relation Receiver to Nofication
  @hasMany(()=>Notification, {
    foreignKey: 'receiverId',
    localKey: 'id'
  })
  declare receivedNotifications: HasMany<typeof Notification>

  @beforeCreate()
  public static async assignUuid(user: User) {
    user.id =randomUUID()
  }
}