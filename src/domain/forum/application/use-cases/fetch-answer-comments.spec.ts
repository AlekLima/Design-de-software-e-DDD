import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '@/test/factories/make-answer-comment'
import { inMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answers-comments-repository'


let inMemoryAnswerCommentsRepository: inMemoryAnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new inMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch  answers comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
    }))
    
    await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
    }))

    await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
    }))


    const { answerComments } = await sut.execute({
        answerId: 'answer-1',
        page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch  paginated answers comment', async () => {
    for (let i = 1; i <= 22; i++) {
        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({ 
                answerId: new UniqueEntityID('answer-1'),
            }))
        }

    
    const { answerComments } = await sut.execute({
        answerId: 'answer-1',
        page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
