import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"
import { AnswersCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository"

export class inMemoryAnswerCommentRepository implements  AnswersCommentRepository {    
    public items: AnswerComment[] = []
  
    async create(answerComment: AnswerComment) {
        this.items.push(answerComment)
    } 
}