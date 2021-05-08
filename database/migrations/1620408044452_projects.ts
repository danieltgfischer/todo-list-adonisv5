import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Projects extends BaseSchema {
  protected tableName = 'projects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title', 80).notNullable()
      table.text('description', 'longtext').notNullable()
      table.boolean('is_done').defaultTo(false)
      table.uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
