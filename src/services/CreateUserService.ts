import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import { hash } from 'bcryptjs'

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService{

    async execute({name, email, admin = false, password} : IUserRequest )
    {
        if(!email)
        {
            throw new Error('Email is required')
        }
        const userRepository = getCustomRepository(UserRepository)
        const userAlreadyExists = await userRepository.findOne({email})

        if(userAlreadyExists)
        {
            throw new Error('User already exists')
        }

        const passHash = await hash(password, 8)

        const newUser = userRepository.create({
            name,
            email,
            admin,
            password: passHash    
        })

        await userRepository.save(newUser)

        return newUser
    }
}

export { CreateUserService }
