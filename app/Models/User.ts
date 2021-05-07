import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import Project from 'App/Models/Project'
import Todo from 'App/Models/Todo'

import {
  BaseModel,
  column,
  beforeCreate,
  beforeSave,
  HasMany,
  hasMany
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async createUUID(user: User) {
    user.id = uuid()
  }

  @hasMany(() => Project)
  public projects: HasMany<typeof Project>

  @hasMany(() => Todo)
  public todos: HasMany<typeof Todo>

}
