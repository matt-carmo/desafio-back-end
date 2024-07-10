import { test } from '@japa/runner'



test.group('Students', () => {

    test('Permitir que aluno se cadastre na aplicação', async ({ client }) => {
        const data = {
            name: 'John Doe',
            email: 'joe@doe',
            registration: '123456',
            birthday: '2000-01-01'
        }
        const response = await client.post('/student').json(data)
        response.assertStatus(201)
        response.assertBodyContains(data)
    })
    test('')
    test('Permitir que aluno edite seus dados de cadastro', async ({ client }) => {
        const data = {
            name: 'João da Silva',
            email: 'jao@silva',
            registration: '678901',
            birthday: '2001-01-01'
        }
        const response = await client.put('/student/1').json(data)
        response.assertBodyContains(data)
        response.assertStatus(200)
    })
    test('Permitir que aluno consulte seus dados de cadastro', async ({ client }) => {
        const response = await client.get('/student/1')
        response.assertBodyContains({ name: 'João da Silva', email: 'jao@silva', registration: '678901', birthday: '2001-01-01' })
        response.assertStatus(200)
    })
    test('Permitir que aluno delete seus dados de cadastro', async ({ client }) => {
        const response = await client.delete('/student/1')
        response.assertStatus(200)
    })

})
