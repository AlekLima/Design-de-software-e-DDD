import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { inMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

let inMemoryAnswerRepository: inMemoryAnswersRepository
let sut: AnswerQuestionUseCase




describe('Create  Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new inMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    

    const result = await sut.execute({
      questionId: '1',
      InstructorId: 'Nova pergunta',
      content: 'Conteudo da resposta',
    })

    

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0].id).toEqual(result.value?.answer)
  })
})
