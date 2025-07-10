import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'followers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable().unique()
      table.string('follower_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('following_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['follower_id', 'following_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}