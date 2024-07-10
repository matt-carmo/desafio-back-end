import { DateTime } from 'luxon'


import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Room from './room.js'

export default class Teacher extends BaseModel {
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

  @column.dateTime({ autoCreate: true })
  declare public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare public updatedAt: DateTime

  @hasMany(() => Room)
  declare public rooms: HasMany<typeof Room>
}
