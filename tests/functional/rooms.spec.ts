import Teacher from "#models/teacher";
import { test } from "@japa/runner";
import { DateTime } from "luxon";

test.group('rooms', () => {
    
    test('Permitir que professor cadastre uma nova sala', async ({ client }) => {

        
        const teacher = await Teacher.create({
            name: 'John Doe',
            email: 'joe@doe',
            registration: '1234567',
            birthday: DateTime.fromISO('1986-01-01')
        })

        if(!teacher) {
            console.log(teacher)
            return console.log('Erro ao criar professor')
        }
        const data = {
            room_number: '1',
            capacity: 30,
            status: 'available',
            teacherId: teacher.id


        }
        const response = await client.post('/room').json(data)
        response.assertStatus(201)
        response.assertBodyNotContains(data)
    }),
    test('Permitir que professor edite uma sala', async ({ client }) => {
        const data = {
     
            capacity: 30,
            status: 'available',
            teacherId: 1,
            room_number: '2'
        }
        const response = await client.put('/room/1').json(data)
       
        response.assertStatus(200)
    })
})