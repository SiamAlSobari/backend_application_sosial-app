import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable().unique()
      table.string('name').notNullable()
      table.string('avatar_image').nullable().defaultTo('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png')
      table.string('banner_image').nullable().defaultTo('https://www.guardianoffshore.com.au/wp-content/themes/guardian-offshore/lib/image_resize.php?src=https://www.guardianoffshore.com.au/wp-content/themes/guardian-offshore/images/default-blog.jpg&w=800&h=225&zc=1')
      table.string('bio').nullable()
      table.string('negara').nullable()
      table.string('kota').nullable()
      table.string('pekerjaan').nullable()
      table.string('website').nullable()
      table.boolean('is_private').notNullable().defaultTo(false)
      table.string('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}