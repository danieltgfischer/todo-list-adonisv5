import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async store({  request, response, auth }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      const token = auth.use('api').attempt(email, password)
      return token
    } catch (error) {
      return response.badRequest('Credenciais inválidas')
    }
  }
}
