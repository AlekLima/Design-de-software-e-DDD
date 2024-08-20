import { inMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { inMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from '@/test/factories/make-question'
import { CommentOnQuestionUseCase } from './comment-on-question'


let inMemoryQuestionRepository: inMemoryQuestionsRepository
let inMemoryQuestionsCommentRepository: inMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new inMemoryQuestionsRepository()
    inMemoryQuestionsCommentRepository = new inMemoryQuestionCommentRepository()

    sut = new CommentOnQuestionUseCase(
        inMemoryQuestionRepository,
        inMemoryQuestionsCommentRepository
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()
    
    await inMemoryQuestionRepository.create(question)
    
    await sut.execute({
      questionId:  question.id.toString(),
      authorId:  question.authorId.toString(),
      content: 'Comentário teste'
    })
    
    expect(inMemoryQuestionsCommentRepository.items[0].content).toEqual('Comentário teste')
       
  })

})
