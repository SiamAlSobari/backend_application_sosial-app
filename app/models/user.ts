import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany, hasOne} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { randomUUID } from 'crypto'
import Profile from './profile.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Post from './post.js'

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

  @hasOne(() => Profile, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  declare profile: HasOne<typeof Profile>

  @hasMany(() => Post, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  declare post: HasMany<typeof Post>

  @hasMany(() => Post, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  declare posts: HasMany<typeof Post>

  @beforeCreate()
  public static async assignUuid(user: User) {
    user.id =randomUUID()
  }
}