import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
  page: number
  answerId: string
}
type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>


export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswersCommentRepository) {}

  async execute({
    answerId,
    page
  }: FetchAnswerCommentsUseCaseRequest) : Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId,{ 
        page,
     })

   

    return right({
      answerComments,
    })
  }
}
 