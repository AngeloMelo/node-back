import { Router } from 'express'
import { CreateTagController } from '../controllers/CreateTagController'
import { ListTagsController } from '../controllers/ListTagsController'
import { ensureAdmin } from '../middlewares/EnsureAdmin'
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated'

const router = Router()

const createTagController = new CreateTagController()
const listTagsController = new ListTagsController()

router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)
router.get('/tags', ensureAuthenticated, listTagsController.handle)
export { router }