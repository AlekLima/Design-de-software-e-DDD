import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from '@/test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { inMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answers-comments-repository'
import { Left } from '@/core/either'
import { NotAllowedError } from './errors/not-allowed-error'


let inMemoryAnswersCommentRepository: inMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersCommentRepository = new inMemoryAnswerCommentRepository()

    sut = new DeleteAnswerCommentUseCase(
        inMemoryAnswersCommentRepository
    )
  })

  it('should be able to delete comment on answer', async () => {
    const answerComment = makeAnswerComment()
    
    await inMemoryAnswersCommentRepository.create(answerComment)
    
    await sut.execute({
      answerCommentId:  answerComment.id.toString(),
      authorId:  answerComment.authorId.toString(),
    })
    
    expect(inMemoryAnswersCommentRepository.items).toHaveLength(0)
       
  })

  it('should not be able to delete diferent user comment on answer', async () => {
    const answerComment = makeAnswerComment({
        authorId: new UniqueEntityID('author-1'),
    })
    
    await inMemoryAnswersCommentRepository.create(answerComment)
    
    const result = await sut.execute({
      answerCommentId:  answerComment.id.toString(),
      authorId:  'author-2',
    })

    
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)   
  })
})
