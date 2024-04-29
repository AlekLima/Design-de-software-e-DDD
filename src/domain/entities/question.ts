
import { Slug } from "./value-objects/slug"
import { Entity} from "../../core/entities/entity"


interface QuestionProps {
    title: string 
    content: string
    slug: Slug
    authorId: string
}

export default class Question extends Entity {
    
   

    constructor (props: QuestionProps, id?: string) {
        super(props,id)

    
       
    }
}

