import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'


let inMemoryQuestionRepository: inMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new inMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to delete question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)


    await sut.execute({
      questionId:  'question-1',
      authorId: 'author-1'
    })


    expect(inMemoryQuestionRepository.items).toHaveLength(0)   
  })

  it('should not be able to delete question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)


    expect (() => {
      return sut.execute({
        questionId:  'question-1',
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)


  })
})
