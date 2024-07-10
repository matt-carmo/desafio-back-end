// import type { HttpContext } from '@adonisjs/core/http'

import Teacher from "#models/teacher";
import { HttpContext } from "@adonisjs/core/http";

export default class TeachersController {


    public async create({ request, response }: HttpContext) {
        const data = request.only(['name', 'email', 'registration', 'birthday'])
        const existingTeacher = await Teacher.query()
            .where('is_deleted', false)
            .andWhere((query) => {
                query.where('email', data.email)
                    .orWhere('registration', data.registration)
            })
            .first()

        if (existingTeacher) {
            let message = 'Professor já existe com '
            if (existingTeacher.email === data.email) {
                message += 'este email'
            } else if (existingTeacher.registration === data.registration) {
                message += 'este registro'
            }
            return response.status(400).json({ message })
        }

        // Cria o professor se não existir duplicidade
        const teacher = await Teacher.create(data)

        return response.status(201).json(teacher)
    }
    public async update({ response, request, params }: HttpContext) {
        const data = request.only(['name', 'email', 'registration', 'birthday'])
        try {
            const teacher = await Teacher.findOrFail(params.id)
            teacher.merge(data)
            await teacher.save()
            return response.status(200).json(teacher)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao atualizar professor', error })
        }
    }
    public async destroy({ response, params }: HttpContext) {
        try {
            const teacher = await Teacher.findOrFail(params.id)
            await teacher.merge({ isDeleted: true }).save()
            return response.status(200).json(teacher)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao deletar professor', error })
        }
    }
    public async show({ response, params }: HttpContext) {
        try {
            const teacher = await Teacher.query().andWhere('is_deleted', false).where('id', params.id).firstOrFail()
            return response.status(200).json(teacher)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao buscar professor', error })
        }
    }
}    