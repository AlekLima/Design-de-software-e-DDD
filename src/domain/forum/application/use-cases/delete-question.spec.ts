import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { inMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachments'
import { makeQuestionAttachment } from '@/test/factories/make-question-attachment'


let inMemoryQuestionRepository: inMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: inMemoryQuestionAttachmentRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {  
    inMemoryQuestionAttachmentsRepository = new  inMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new inMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to delete question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

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


    const result = await sut.execute({
      questionId:  'question-1',
      authorId: 'author-2'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)


  })
})
