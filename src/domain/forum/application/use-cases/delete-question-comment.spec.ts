import { inMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from '@/test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'


let inMemoryQuestionsCommentRepository: inMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentRepository = new inMemoryQuestionCommentRepository()

    sut = new DeleteQuestionCommentUseCase(
        inMemoryQuestionsCommentRepository
    )
  })

  it('should be able to delete comment on question', async () => {
    const questionComment = makeQuestionComment()
    
    await inMemoryQuestionsCommentRepository.create(questionComment)
    
    await sut.execute({
      questionCommentId:  questionComment.id.toString(),
      authorId:  questionComment.authorId.toString(),
    })
    
    expect(inMemoryQuestionsCommentRepository.items).toHaveLength(0)
       
  })

  it('should not be able to delete diferent user comment on question', async () => {
    const questionComment = makeQuestionComment({
        authorId: new UniqueEntityID('author-1'),
    })
    
    await inMemoryQuestionsCommentRepository.create(questionComment)
    
    
    const result = await sut.execute({
      questionCommentId:  questionComment.id.toString(),
      authorId:  'author-2',
    })
    
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    
  })
})
