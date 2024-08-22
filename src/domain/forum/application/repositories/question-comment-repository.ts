import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionsCommentRepository {
    create(questionComment: QuestionComment): Promise<void>
    delete(questionComment: QuestionComment): Promise<void>
    findById(id: string):Promise<QuestionComment | null>
}