import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'
import { secret } from '../util/keys'

interface IPayload{
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){

    //extract token
    const rawToken = req.headers.authorization
    
    //check token is fullfiled
    if(!rawToken){
        return res.status(401).end()
    }

    const [, token] = rawToken.split(' ')
    
    try {

        //check if token is valid
        const decoded = verify(token, secret) as IPayload

        //read user information and save on request
        const { sub } = decoded
        req.user_id = sub

    } catch (error) {
        
        return res.status(401).end()
    }

    return next()
}
