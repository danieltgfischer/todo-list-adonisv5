import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'UsersController.index')

Route.post('user', 'UsersController.store')
Route.post('session', 'SessionsController.store')
