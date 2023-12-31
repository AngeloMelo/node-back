import { getCustomRepository } from "typeorm"
import { ComplimentRepository } from "../repositories/ComplimentRepository"

class ListUserReceiveComplimentsService {

    async execute(user_id: string){

        const complimentRepository = getCustomRepository(ComplimentRepository)
        const compliements = complimentRepository.find({

            where: {
                user_receiver: user_id
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

export { ListUserReceiveComplimentsService }
