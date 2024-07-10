import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Room from './room.js'
import Student from './student.js'



export default class RoomsAllocation extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public roomId: number

  @column()
  declare public studentId: number

  @column.dateTime({ autoCreate: true })
  declare public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare public updatedAt: DateTime

  @belongsTo(() => Room)
  declare public room: BelongsTo<typeof Room>

  @belongsTo(() => Student)
  declare public student: BelongsTo<typeof Student>
}
