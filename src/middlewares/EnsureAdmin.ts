import {Request, Response, NextFunction} from 'express'
import { getCustomRepository } from 'typeorm'
import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction){

    const { user_id } = req

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({id: user_id}) as User
    
    console.log('user:: ' + JSON.stringify(user))
    if(user.admin){
        return next()
    }

    return res.status(401).json({
        error: 'Unauthorized'
    })
}
