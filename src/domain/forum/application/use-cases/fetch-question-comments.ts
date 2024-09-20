import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentRepository } from '../repositories/question-comment-repository'
import { Either, right } from '@/core/either'

interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionsCommentRepository) {}

  async execute({
    questionId,
    page
  }: FetchQuestionCommentsUseCaseRequest) : Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId,{ 
        page,
     })

   

    return right({
      questionComments,
    })
  }
}
 