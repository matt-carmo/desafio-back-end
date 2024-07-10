import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.boolean('is_deleted').defaultTo(false)
 
      table.string('room_number').notNullable()
      table.integer('teacherId').unsigned().references('id').inTable('teachers').notNullable()
      table.integer('capacity').notNullable()
      table.enum('status', ['available', 'unavailable']).notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

    })
  }
  

  async down() {
    this.schema.dropTable(this.tableName)
  }
}