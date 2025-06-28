import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable().unique()
      table.string('name').notNullable()
      table.string('avatar_image').nullable().defaultTo('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png')
      table.string('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}