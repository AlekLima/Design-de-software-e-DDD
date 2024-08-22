import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
  page: number
  answerId: string
}

interface FetchAnswerCommentsUseCaseResponse {
    answerComments: AnswerComment[]
  }

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswersCommentRepository) {}

  async execute({
    answerId,
    page
  }: FetchAnswerCommentsUseCaseRequest) : Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId,{ 
        page,
     })

   

    return {
        answerComments,
    }
  }
}
 