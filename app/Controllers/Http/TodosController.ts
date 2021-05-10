import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({ params, response }: HttpContextContract) {
    try {
      return await Todo
        .query()
        .preload('user', owner => owner.select('id', 'name'))
        .paginate(params.page)
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao buscar os todos',
          error
        }
      })
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const data = request.all()
      const todo = await Todo.create({ ...data, userId: auth?.user?.id })
      return todo
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao criar o todo',
          error
        }
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      return await Todo.findOrFail(params.id)
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao buscar o todo',
          error
        }
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const data = request.all()
      const todo = await Todo.findOrFail(params.id)
      await todo.merge(data)
      await todo.save()
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao atualizar o todo',
          error
        }
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const todo = await Todo.findOrFail(params.id)
      await todo.delete()
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao deletar o todo',
          error
        }
      })
    }
  }
}
