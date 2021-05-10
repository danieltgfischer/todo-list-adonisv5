import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'UsersController.index')

Route.post('user', 'UsersController.store')
Route.post('session', 'SessionsController.store')

Route.group(() => {
  Route.resource('projects', 'ProjectsController').apiOnly().except(['index', 'show'])
  Route.get('projects/:page', 'ProjectsController.index')
  Route.get('project/:id', 'ProjectsController.show')
}).middleware('auth')
