import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import { hash } from 'bcryptjs'
import { User } from "../entities/User"

interface IUserRequest{
    id: string;
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class UpdateUserService{

    async execute({id, name, email, admin = false, password} : IUserRequest )
    {
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne(id) as User

        if(name)
        {
            user.name = name
        }

        if(email)
        {
            user.email = email
        }

        user.admin = admin

        if(password)
        {
            user.password = await hash(password, 8)
        }
        
        const updtUser = await userRepository.save(user)

        return updtUser
    }
}

export { UpdateUserService }
