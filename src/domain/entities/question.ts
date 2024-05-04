
import { Slug } from "./value-objects/slug"
import { Entity} from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"


interface QuestionProps {
    title: string 
    content: string
    slug: Slug
    authorId: UniqueEntityID
    bestAnswerId?: UniqueEntityID
    createdAt:  Date
    updatedAt?:  Date
}

export default class Question extends Entity <QuestionProps> {
    static create(
        props: Optional<QuestionProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const question = new Question({
            ...props,
            createdAt: new Date(),
        }, id)

        return question
    }
}


