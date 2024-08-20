import { inMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { makeAnswer } from '@/test/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { inMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answers-comments-repository'


let inMemoryAnswerRepository: inMemoryAnswersRepository
let inMemoryAnswersCommentRepository: inMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new inMemoryAnswersRepository()
    inMemoryAnswersCommentRepository = new inMemoryAnswerCommentRepository()

    sut = new CommentOnAnswerUseCase(
        inMemoryAnswerRepository,
        inMemoryAnswersCommentRepository
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()
    
    await inMemoryAnswerRepository.create(answer)
    
    await sut.execute({
      answerId:  answer.id.toString(),
      authorId:  answer.authorId.toString(),
      content: 'Comentário teste'
    })
    
    expect(inMemoryAnswersCommentRepository.items[0].content).toEqual('Comentário teste')
       
  })

})
