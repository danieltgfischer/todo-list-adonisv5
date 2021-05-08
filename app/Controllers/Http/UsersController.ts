import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.all()
      await User.create(data)
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
