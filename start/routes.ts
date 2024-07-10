/*
|--------------------------------------------------------------------------
| routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import RoomsController from '#controllers/rooms_controller'
import StudentsController from '#controllers/students_controller'
import TeachersController from '#controllers/teachers_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


// routes for Students


router.get('students', [StudentsController, 'index'])
router.post('student', [StudentsController, 'create'])
router.put('student/:id', [StudentsController, 'update'])
router.delete('student/:id', [StudentsController, 'destroy'])
router.get('student/:id', [StudentsController, 'show'])

// routes for Teachers
router.post('teacher', [TeachersController, 'create'])
router.put('teacher/:id', [TeachersController, 'update'])
router.delete('teacher/:id', [TeachersController, 'destroy'])
router.get('teacher/:id', [TeachersController, 'show'])
router.get('rooms/:roomId/students', [RoomsController, 'listStudents'])


// routes for Rooms
router.post('room', [RoomsController, 'create'])
router.put('room/:id', [RoomsController, 'update'])
router.delete('room/:id', [RoomsController, 'destroy'])
router.get('room/:id', [RoomsController, 'show'])
router.post('room/:id/allocate', [RoomsController, 'allocateStudent'])
router.delete('room/:roomId/remove/:studentId', [RoomsController, 'removeStudent'])
router.get('room/:id/students', [RoomsController, 'listStudents'])

//route for students allocation in rooms
router.get('student/:id/rooms', [StudentsController, 'listRooms'])

//Não foi adicionado a lógica do MiddleWares, porém, tenho noção de como fazer isso..
router.get('room/:roomId/all-students', [RoomsController, 'listStudentsForRoom'])