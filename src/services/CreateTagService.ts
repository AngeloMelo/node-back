import { getCustomRepository } from "typeorm"
import { TagRepository } from "../repositories/TagRepository"

interface ITagRequest{
    name: string;
}

class CreateTagService{

    async execute({name} : ITagRequest )
    {
        if(!name)
        {
            throw new Error('Name is required')
        }

        const tagRepository = getCustomRepository(TagRepository)
        const tagAlreadyExists = await tagRepository.findOne({name})

        if(tagAlreadyExists)
        {
            throw new Error('Tag already exists')
        }

        const newTag = tagRepository.create({
            name    
        })

        await tagRepository.save(newTag)

        return newTag
    }
}

export { CreateTagService }
