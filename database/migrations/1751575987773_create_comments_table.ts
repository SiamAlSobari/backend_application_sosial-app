import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable().unique()
      table.text('comment').notNullable()
      table.string('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('post_id').notNullable().references('id').inTable('posts').onDelete('CASCADE')
      table.string('parent_id').nullable().references('id').inTable('comments').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}