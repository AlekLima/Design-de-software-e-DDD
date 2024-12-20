import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswersCommentRepository {
    findById(id: string): Promise<AnswerComment | null>
    delete(answerComment: AnswerComment): Promise<void>
    create(answerComment: AnswerComment): Promise<void>
    findManyByAnswerId(
        answerId: string,
        params: PaginationParams
    ): Promise<AnswerComment[]>

}