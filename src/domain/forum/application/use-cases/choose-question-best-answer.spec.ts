import { inMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from '@/test/factories/make-question'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { inMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answers-attachments-repository'
import { inMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachments'

let inMemoryAnswerAttachmentRepository: inMemoryAnswerAttachmentsRepository
let  inMemoryQuestionAttachmentsRepository: inMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: inMemoryQuestionsRepository
let inMemoryAnswerRepository: inMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository = new inMemoryAnswerAttachmentsRepository()
    inMemoryQuestionAttachmentsRepository = new inMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new inMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    inMemoryAnswerRepository = new inMemoryAnswersRepository(inMemoryAnswerAttachmentRepository)

    sut = new ChooseQuestionBestAnswerUseCase(
        inMemoryQuestionRepository,
        inMemoryAnswerRepository
    )
  })

  it('should be able to choose the question  best answer', async () => {
    const question = makeQuestion()
    
    const answer = makeAnswer({
        questionId: question.id,
    })
    

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)



    await sut.execute({
      answerId:  answer.id.toString(),
      authorId:  question.authorId.toString(),
    })
    


    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
       
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
        authorId: new UniqueEntityID('author-1')
    })
    const answer = makeAnswer({
        questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    const result = await sut.execute({
      answerId:  answer.id.toString(),
      authorId: 'author-2'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
