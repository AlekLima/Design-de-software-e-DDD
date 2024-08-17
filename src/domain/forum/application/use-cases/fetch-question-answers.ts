import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

interface FetchQuestionsAnswersUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionsAnswersUseCaseResponse {
    answers: Answer[]
  }

export class FetchQuestionsAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page
  }: FetchQuestionsAnswersUseCaseRequest) : Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId,{ page })

   

    return {
        answers,
    }
  }
}
