import { CreateQuestionUseCase } from './create-question'
import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'


let inMemoryQuestionRepository: inMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new inMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {

    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteud da pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)
  })


  
})
