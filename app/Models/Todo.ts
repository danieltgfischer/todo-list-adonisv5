import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'

import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'
import User from 'App/Models/User'

export default class Todo extends BaseModel {
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

  @column()
  public projectd: string

  @column.dateTime()
  public due_date: DateTime

  @beforeCreate()
  public static async createUUID(todo: Todo) {
    todo.id = uuid()
  }

  @belongsTo(() => Project, { localKey: 'id', foreignKey: 'projectd' })
  public project: BelongsTo<typeof Project>

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'userId' })
  public user: BelongsTo<typeof User>
}
