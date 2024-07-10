import Room from '#models/room'
import RoomsAllocation from '#models/rooms_allocation'
import Student from '#models/student'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'



test.group('Teachers', () => {
    test('Permitir que professor se cadastre na aplicação', async ({ client }) => {
        const data = {
            name: 'Professor John Doe',
            email: 'professor_joe@doe',
            registration: '123',
            birthday: '1986-01-01'
        }
        const response = await client.post('/teacher').json(data)
        response.assertStatus(201)
        // response.assertBodyContains(data)
    })
    test('Permitir que professor edite seus dados de cadastro', async ({ client }) => {
        const data = {
            name: 'Prof. João da Silva',
            email: 'professor_jao@silva',
            registration: '7654321',
            birthday: '1987-01-01'
        }
        const response = await client.put('/teacher/1').json(data)
        response.assertBodyContains(data)
        response.assertStatus(200)
    })
    test('Permitir que professor consulte seus dados de cadastro', async ({ client }) => {
        const response = await client.get('/teacher/1')
        response.assertStatus(200)
    })
    test('Permitir que professor exclua seus dados de cadastro', async ({ client }) => {
        const response = await client.delete('/teacher/1')
        response.assertStatus(200)
    })
    test('Permitir que professor remova o aluno de uma sala', async ({ client }) => {
        const student = await Student.create({
            name: 'Estudante John Doe',
            email: 'estudante_joe@doe',
            registration: '123',
            birthday: DateTime.fromISO('1986-01-01')
        })
        const room = await Room.create({
            room_number: '1',
            capacity: 30,
            status: 'available',
            teacherId: 1


        })

        await RoomsAllocation.create({
            roomId: room.id,
            studentId: student.id
        })
        const response = await client.delete(`/room/${room.id}/remove/${student.id}`)
        response.assertStatus(200)
    })
    
    test('')
})