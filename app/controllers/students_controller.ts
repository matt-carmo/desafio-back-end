import Student from "#models/student"
import { HttpContext } from "@adonisjs/core/http"

export default class StudentsController {

    public async index({ response }: HttpContext) {
        const students = await Student.all()
        return response.json(students)
    }
    public async create({ response, request }: HttpContext) {
        const data = request.only(['name', 'email', 'registration', 'birthday'])

        
        try {
            const existingStudent = await Student.query()
                .where('is_deleted', false)
                .andWhere((query) => {
                    query.where('registration', data.registration)
                        .orWhere('email', data.email)
                })
                .first()
            if (existingStudent) {
                let message = 'Estudante já existe com '
                if (existingStudent.email === data.email) {
                    message += 'este email'
                } else if (existingStudent.registration === data.registration) {
                    message += 'este registro'
                }
                return response.status(400).json({ message })
            }
            const student = await Student.create(data)

            return response.status(201).json(student)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao criar estudante', error })
        }
    }
    public async update({ response, request, params }: HttpContext) {
        const data = request.only(['name', 'email', 'registration', 'birthday'])
        try {
            const student = await Student.findOrFail(params.id)
            student.merge(data)
            await student.save()
            return response.status(200).json(student)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao atualizar estudante', error })
        }
    }
    public async show({ response, params }: HttpContext) {
        try {
            const student = await Student.query().andWhere('is_deleted', false).where('id', params.id).firstOrFail()
            return response.status(200).json(student)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao buscar estudante', error })
        }
    }
    public async destroy({ response, params }: HttpContext) {
        try {
            const student = await Student.findOrFail(params.id)
            await student.merge({ isDeleted: true }).save()

            return response.status(200).json(student)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao deletar estudante', error })
        }
    }
    public async listRooms({ response, params }: HttpContext) {
        try {
            const studentId = params.id;

            // Obtenha o aluno e suas alocações de sala
            const student = await Student.query()
                .select('id', 'name')
                .where('is_deleted', false)
                .where('id', studentId)
                .preload('roomsAllocations', (roomsAllocationsQuery) => {
                    roomsAllocationsQuery.preload('room', (roomQuery) => {
                        roomQuery.preload('teacher', (teacherQuery) => {
                            teacherQuery.select('name');
                        });
                    });
                })
                .firstOrFail();
    
            // Transforme os dados no formato desejado
            const result = {
                studentName: student.name,
                rooms: student.roomsAllocations.map(allocation => ({
                    roomNumber: allocation.room.room_number,
                    teacherName: allocation.room.teacher.name
                }))
            };
    
            return response.status(200).json(result);
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Erro ao buscar salas', error })
        }
    }
}