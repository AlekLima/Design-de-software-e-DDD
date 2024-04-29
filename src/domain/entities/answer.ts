
import { Entity } from "../../core/entities/entity"

interface AnswerProps {
    content: string
    authorId: String
    questionId: String
}

export class Answer extends Entity <AnswerProps>  {
    get content() {
        return this.props.content
    }

}