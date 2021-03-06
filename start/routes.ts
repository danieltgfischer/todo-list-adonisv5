import Route from '@ioc:Adonis/Core/Route'

Route.post('users', 'UsersController.store')
Route.post('session', 'SessionsController.store')

Route.group(() => {
  Route.resource('users', 'UsersController')
    .apiOnly()
    .except(['store'])
  Route.resource('projects', 'ProjectsController')
    .apiOnly()
    .except(['index', 'show'])
  Route.get('projects/:page', 'ProjectsController.index')
  Route.get('project/:id', 'ProjectsController.show')
  Route.get('projects/:id/info/todos', 'ProjectsController.infoTodos')
  Route.resource('projects.todos', 'TodosController')
    .apiOnly()
    .except(['index', 'show'])
  Route.get('projects/:project_id/todos/:page', 'TodosController.index')
  Route.get('project/:project_id/todo/:id', 'TodosController.show')
}).middleware('auth')
