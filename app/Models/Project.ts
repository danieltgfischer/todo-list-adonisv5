import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import Todo from 'App/Models/Todo'
import User from 'App/Models/User'

import { BaseModel, column, beforeCreate, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public is_done: boolean

  @column()
  public userId: string

  @beforeCreate()
  public static async createUUID(project: Project) {
    project.id = uuid()
  }

  @hasMany(() => Todo)
  public todos: HasMany<typeof Todo>

  @hasOne(() => User, { localKey: 'userId', foreignKey: 'id'})
  public owner: HasOne<typeof User>
}
