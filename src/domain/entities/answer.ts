import { randomUUID } from "crypto"

interface AnswerProps {
    content: string
    authorId: String
    questionId: String
}

export class Answer {
    public id: string
    public content: string
    public authorId: string
    public questionId: string

    constructor ( props: AnswerProps, id?: string) {
        this.content = props.content
        this.authorId = props.content
        this.questionId = props.content
        this.id = id ?? randomUUID() 
    }
}