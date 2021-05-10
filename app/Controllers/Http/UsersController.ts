import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index() {
    return await User.all()
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const userExists = await User.findBy('email',  request.input('email') )
      if (userExists) {
        return response.send({
          error: {
            message: 'Usuário já existente'
          }
        })
      }
      const data = request.all()
      const user = await User.create(data)
      return user
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao criar o usuário',
          error
        }
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {

      const data = request.all()
      const user = await User.firstOrFail(params.id)
      await user.merge(data)
      await user.save()
      return user
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao atualizar o usuário',
          error
        }
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.firstOrFail(params.id)
      await user.delete()
      return user
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao excluir o usuário',
          error
        }
      })
    }
  }
}
