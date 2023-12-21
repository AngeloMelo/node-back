import { Request, Response } from 'express'
import { UpdateUserService } from '../services/UpdateUserService'

class UpdateUserController{

    async handle(req: Request, res: Response)
    {
        const { email, name, admin, password } = req.body
        const { id } = req.params

        const updateUserService = new UpdateUserService()

        const user = await updateUserService.execute({id, name, email, admin, password})

        return res.json(user)
    }
}

export { UpdateUserController }
