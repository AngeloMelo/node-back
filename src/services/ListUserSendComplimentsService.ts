import { getCustomRepository } from "typeorm"
import { ComplimentRepository } from "../repositories/ComplimentRepository"

class ListUserSendComplimentsService {

    async execute(user_id: string){

        const complimentRepository = getCustomRepository(ComplimentRepository)
        const compliements = complimentRepository.find({

            where: {
                user_sender: user_id
            },
            relations:[
                'userSender',
                'userReceiver',
                'tag'
            ]
        })
         
        return compliements
    }
}

export { ListUserSendComplimentsService }
