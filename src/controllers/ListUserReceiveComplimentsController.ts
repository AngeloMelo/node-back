import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";


class ListUserReceiveComplimentsController{

    async handle(req: Request, res: Response){

        const { user_id } = req
        const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService()
        const compliements = await listUserReceiveComplimentsService.execute(user_id)

        return res.json(compliements)

    }
}

export { ListUserReceiveComplimentsController }
