import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute ({email, password}: IAuthenticateRequest){

        const userRepository = getCustomRepository(UserRepository)
        
        //check if email exists
        const user = await userRepository.findOne({email})

        if(!user){
            throw new Error('E-mail or password does not match')
        }

        //check if password is correct
        const passMatch = await compare(password, user.password)

        if(!passMatch){
            throw new Error('E-mail or password does not match')
        }

        //gerar token

        const payload = {
            email:user.email,
        }
        const token = sign(payload, '97c728e4bbc37845665a0fdfc2f53500',{
            subject: user.id, 
            expiresIn: '1d'
        })

        return token
    }
}

export { AuthenticateUserService }
