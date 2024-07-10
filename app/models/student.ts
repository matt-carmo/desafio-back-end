import { DateTime } from 'luxon'


import RoomsAllocation from './rooms_allocation.js'
import Room from './room.js'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public isDeleted: boolean
  
  @column()
  declare public name: string

  @column()
  declare public email: string

  @column()
  declare public registration: string

  @column.date()
  declare public birthday: DateTime

  @column()
  declare public roomId: number

  @column.dateTime({ autoCreate: true })
  declare public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare public updatedAt: DateTime

  @belongsTo(() => Room)
  declare public room: BelongsTo<typeof Room>

  @hasMany(() => RoomsAllocation)
  declare public roomsAllocations: HasMany<typeof RoomsAllocation>
}
