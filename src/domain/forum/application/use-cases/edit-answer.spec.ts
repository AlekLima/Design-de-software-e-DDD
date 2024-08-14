import { inMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { makeAnswer } from '@/test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'


let inMemoryAnswerRepository: inMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new inMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)


    await sut.execute({
      answerId:  newAnswer.id.toString(),
      content: 'Conteúdo Teste',
      authorId: 'author-1'
    })


    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
        content: 'Conteúdo Teste'
    })   
  })

  it('should not be able to edit a answer  from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)


    expect (() => {
      return sut.execute({
        answerId:  newAnswer.id.toString(),
        content: 'Conteúdo Teste',
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)


  })
})
