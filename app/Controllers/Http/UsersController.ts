import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
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
}
