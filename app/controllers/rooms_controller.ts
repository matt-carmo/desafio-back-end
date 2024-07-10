// import type { HttpContext } from '@adonisjs/core/http'

import Room from "#models/room"
import RoomsAllocation from "#models/rooms_allocation"
import Student from "#models/student"
import { HttpContext } from "@adonisjs/core/http"

export default class RoomsController {

    public async index({ response }: HttpContext) {
        return response.json({ hello: 'world' })
    }

    public async create({ response, request }: HttpContext) {
        const data = request.only(['name', 'room_number', 'capacity', 'status', 'teacherId'])

        try {
            const room = await Room.create(data)
            return response.status(201).json(room)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao criar sala', error })
        }
    }

    public async show({ response, params }: HttpContext) {
        try {
            const room = await Room.query().where('is_deleted', false).andWhere('id', params.id).firstOrFail()
            return response.status(200).json(room)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao buscar sala', error })
        }
    }
    public async destroy({ response, params }: HttpContext) {
        try {
            const room = await Room.findOrFail(params.id)
            await room.merge({ is_deleted: true }).save()
            return response.status(200).json(room)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao deletar sala', error })
        }
    }
    public async removeStudent({ response, params }: HttpContext) {
        try {
            const room = await RoomsAllocation.query().where('room_id', params.roomId).andWhere('student_id', params.studentId).firstOrFail()
            await room.delete()
            return response.status(200).json(room)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao remover estudante da sala', error })
        }
    }

    public async update({ response, request, params }: HttpContext) {

        try {

            const data = request.only(['room_number', 'capacity', 'status', 'teacherId'])
            const room = await Room.findOrFail(params.id)

            if (data.teacherId !== room.teacherId) {
                return response.status(400).json({ message: 'Sala não pertence ao professor' })
            }
            room.merge(data)
            await room.save()
            return response.status(200).json(room)
        } catch (error) {

            console.log(error)
            return response.status(400).json({ message: 'Erro ao atualizar sala', })
        }
    }
    public async allocateStudent({ response, request }: HttpContext) {

        try {
            const data = request.only(['student_id'])
            const room = await Room.query().where('id', request.params().id).preload('roomsAllocations').firstOrFail()

            const existStudentToRoom = await RoomsAllocation.query()
                .where('room_id', request.params().id)
                .andWhere('student_id', data.student_id)
                .first()



            if (existStudentToRoom !== null) {
                return response.status(400).json({ message: 'Estudante ja atribuido a essa sala' })
            }

            if (room.capacity <= room.roomsAllocations.length) {
                return response.status(400).json({ message: 'Sala lotada' })
            }
            if (room.status === 'unavailable') {
                return response.status(400).json({ message: 'Sala indisponível' })
            }
            const student = await RoomsAllocation.create(
                { roomId: request.params().id, studentId: data.student_id }
            )


            return response.status(200).json(student)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao atribuir estudante', error })
        }
    }
    public async listStudents({ response, params }: HttpContext) {

        try {
            const studentId = params.id

            // Obtenha o aluno e suas alocações de sala
            const student = await Student.query()
                .where('id', studentId)
                .preload('roomsAllocations', (roomsAllocationsQuery) => {
                    roomsAllocationsQuery.preload('room', (roomQuery) => {
                        roomQuery.preload('teacher')
                    })
                })
                .firstOrFail()
            return student
            // Mapeie os dados necessários
            const roomsInfo = student.roomsAllocations.map((allocation) => {
                const room = allocation.room
                const teacher = room.teacher

                return {
                    room_number: room.room_number,
                    teacher_name: teacher.name,
                }
            })

            return response.json({
                student_name: student.name,
                rooms: roomsInfo,
            })
        } catch (error) {
            return response.status(404).json({ error: 'Student not found' })
        }

    }

    public async listStudentsForRoom({ response, params }: HttpContext) {
        try {
            const students = await RoomsAllocation.query().where('room_id', params.roomId).preload('student')

            return response.status(200).json(students)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao buscar estudantes da sala', error })
        }
    }
}