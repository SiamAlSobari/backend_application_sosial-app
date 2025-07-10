import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary().unique()
      table.string('sender_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('receiver_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.enum('type', ['like', 'comment', 'follow_request', 'comment_reply', 'follow_back',]).notNullable()
      table.boolean('is_read').defaultTo(false)
      table.text('message').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}