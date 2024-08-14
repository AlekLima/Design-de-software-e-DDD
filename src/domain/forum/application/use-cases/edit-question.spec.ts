import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'


let inMemoryQuestionRepository: inMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('EditQuestion Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new inMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)


    await sut.execute({
      questionId:  newQuestion.id.toString(),
      title: 'Pergunta Teste',
      content: 'Conteúdo Teste',
      authorId: 'author-1'
    })


    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
        title: 'Pergunta Teste',
        content: 'Conteúdo Teste'
    })   
  })

  it('should not be able to edit a question  from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)


    expect (() => {
      return sut.execute({
        questionId:  newQuestion.id.toString(),
        title: 'Pergunta Teste',
        content: 'Conteúdo Teste',
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)


  })
})
