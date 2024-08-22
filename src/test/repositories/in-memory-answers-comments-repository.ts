import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"
import { AnswersCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository"

export class inMemoryAnswerCommentRepository implements  AnswersCommentRepository {    
    public items: AnswerComment[] = []
  
    async create(answerComment: AnswerComment) {
        this.items.push(answerComment)
    }
    
    async findById(id: string) {
        const answerComment = this.items.find((item) => item.id.toString() === id)

        if (!answerComment) {
            return null
        }

        return answerComment
    }

    async delete(answerComment: AnswerComment) {
        const itemIndex = this.items.findIndex(item => item.id === answerComment.id)

        this.items.splice(itemIndex, 1)
    }
}