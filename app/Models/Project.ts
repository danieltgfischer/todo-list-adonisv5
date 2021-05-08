import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import Todo from 'App/Models/Todo'

import { BaseModel, column, beforeCreate, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

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
  public userId: string

  @beforeCreate()
  public static async createUUID(project: Project) {
    project.id = uuid()
  }
}
