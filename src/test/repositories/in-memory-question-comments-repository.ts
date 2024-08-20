import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"
import { QuestionsCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository"

export class inMemoryQuestionCommentRepository implements  QuestionsCommentRepository {    
    public items: QuestionComment[] = []
  
    async create(questionComment: QuestionComment) {
        this.items.push(questionComment)
    } 
}