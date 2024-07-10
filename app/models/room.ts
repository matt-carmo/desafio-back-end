import { DateTime } from 'luxon'

import Teacher from './teacher.js'
import RoomsAllocation from './rooms_allocation.js'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number


  @column({ columnName: 'teacherId' })
  declare public teacherId: number;

  @column()
  declare public is_deleted: boolean

  @column()
  declare public room_number: string
  
  @column()
  declare public capacity: number

  @column()
  declare public status: 'available' | 'unavailable'

  @column.dateTime({ autoCreate: true })
  declare public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare public updatedAt: DateTime

  @belongsTo(() => Teacher)
  declare public teacher: BelongsTo<typeof Teacher>

  @hasMany(() => RoomsAllocation)
  declare public roomsAllocations: HasMany<typeof RoomsAllocation>
}
