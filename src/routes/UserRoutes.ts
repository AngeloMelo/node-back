import { Router } from 'express'
import { ListUserController } from '../controllers/ListUserController'
import { CreateUserController } from '../controllers/CreateUserController'
import { UpdateUserController } from '../controllers/UpdateUserController'
import { AuthenticateUserController } from '../controllers/AuthenticateUserController'
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated'
import { ListUserSendComplimentsController } from '../controllers/ListUserSendComplimentsController'
import { ListUserReceiveComplimentsController } from '../controllers/ListUserReceiveComplimentsController'

const router = Router()

const listUserController = new ListUserController()
const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const authenticateUserController = new AuthenticateUserController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()

router.get('/users', ensureAuthenticated, listUserController.handle)
router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle)
router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle)
router.post('/users', ensureAuthenticated, createUserController.handle)
router.put('/users/:id', ensureAuthenticated, updateUserController.handle)
router.post('/login', authenticateUserController.handle)

export { router }