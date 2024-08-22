import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { inMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from '@/test/factories/make-question-comment'


let inMemoryQuestionCommentsRepository: inMemoryQuestionCommentRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new inMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch  questions comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
        questionId: new UniqueEntityID('question-1')
    }))
    
    await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
        questionId: new UniqueEntityID('question-1')
    }))

    await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
        questionId: new UniqueEntityID('question-1')
    }))


    const { questionComments } = await sut.execute({
        questionId: 'question-1',
        page: 1,
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch  paginated questions comment', async () => {
    for (let i = 1; i <= 22; i++) {
        await inMemoryQuestionCommentsRepository.create(
            makeQuestionComment({ 
                questionId: new UniqueEntityID('question-1'),
            }))
        }

    
    const { questionComments } = await sut.execute({
        questionId: 'question-1',
        page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
