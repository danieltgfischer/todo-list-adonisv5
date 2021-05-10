import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'

export default class ProjectsController {

  public async index({ params, response }: HttpContextContract) {
    try {
      const projects = await Project
        .query()
        .preload('owner', owner => owner.select('id', 'name'))
        .paginate(params.page)

      return projects
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao buscar os projetos',
          error
        }
      })
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { title, description } = request.all()
      const project = await Project.create({ title, description, userId: auth?.user?.id })
      return project
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao criar o projeto',
          error
        }
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const project = await Project.query()
        .where('id', params.id)
        .with('owner', owner => owner.select('name'))

      return project
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao buscar o projeto',
          error
        }
      })
    }
  }

  public async infoTodos({ params, response }: HttpContextContract) {
    try {
      const project = await Project.query(params.id)
        .withCount('todos', todos => todos.where('is_done', false).as('unfinished_todos'))
        .withCount('todos', todos => todos.where('is_done', true).as('finished_todos'))
        .withCount('todos', todos => todos.as('count_todos'))
        .pojo()

      return project
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao buscar o projeto',
          error
        }
      })
    }
  }
  public async update({ params, response, request }: HttpContextContract) {
    try {
      const data = request.all()
      const project = await Project.firstOrFail(params?.id)
      await project.merge(data)
      project.save()
      return project
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao buscar o projeto',
          error
        }
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const project = await Project.findOrFail(params.id)
      await project.delete()
    } catch (error) {
      return response.status(500).send({
        error: {
          message: 'Algo deu errado ao deletar o projeto',
          error
        }
      })
    }
  }
}
