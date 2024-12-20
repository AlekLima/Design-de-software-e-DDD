import { inMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { inMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answers-attachments-repository'
import { makeAnswerAttachment } from '@/test/factories/make-answer-attachments'

let inMemoryAnswerAttachmentRepository: inMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository: inMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository = new inMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new inMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )

    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    inMemoryAnswerAttachmentRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )


    await sut.execute({
      answerId:  'answer-1',
      authorId: 'author-1'
    })


    expect(inMemoryAnswerRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
        answerId:  'answer-1',
        authorId: 'author-2'
      })
  

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)


  })
})
