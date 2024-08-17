import { inMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchQuestionsAnswersUseCase } from './fetch-question-answers'


let inMemoryAnswerRepository: inMemoryAnswersRepository
let sut: FetchQuestionsAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new inMemoryAnswersRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch  questions answers', async () => {
    await inMemoryAnswerRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryAnswerRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryAnswerRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
    }))


    const { answers } = await sut.execute({
        questionId: 'question-1',
        page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch  paginated questions answers', async () => {
    for (let i = 1; i <= 22; i++) {
        await inMemoryAnswerRepository.create(
            makeAnswer({ 
                questionId: new UniqueEntityID('question-1'),
            }))
        }

    
    const { answers } = await sut.execute({
        questionId: 'question-1',
        page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
