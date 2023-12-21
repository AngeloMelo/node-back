import { Router } from 'express'
import { CreateComplimentController } from '../controllers/CreateComplimentController'
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated'

const router = Router()

const createComplimentController = new CreateComplimentController()

router.post('/compliments', ensureAuthenticated, createComplimentController.handle)

export { router }
