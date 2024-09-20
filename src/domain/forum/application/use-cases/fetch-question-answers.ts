import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { Either, right } from '@/core/either'

interface FetchQuestionsAnswersUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionsAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
> 

export class FetchQuestionsAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page
  }: FetchQuestionsAnswersUseCaseRequest) : Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId,{ page })

   

    return right({
      answers,
    })
  }
}
