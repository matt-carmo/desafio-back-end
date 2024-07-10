import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms_allocations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('room_id').unsigned().references('id').inTable('rooms').notNullable()
      table.integer('student_id').unsigned().references('id').inTable('students').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
      
    })
  }  

  async down() {
    this.schema.dropTable(this.tableName)
  }
}