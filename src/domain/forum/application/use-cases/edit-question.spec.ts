import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { inMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachments'
import { makeQuestionAttachment } from '@/test/factories/make-question-attachment'


let inMemoryQuestionRepository: inMemoryQuestionsRepository
let inMemoryQuestionsAttachmentRepository: inMemoryQuestionAttachmentRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
   
    inMemoryQuestionsAttachmentRepository = 
      new inMemoryQuestionAttachmentRepository()

    inMemoryQuestionRepository = new inMemoryQuestionsRepository(inMemoryQuestionsAttachmentRepository)

    sut = new EditQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionsAttachmentRepository,
    )
  })

  it('should be able to edit question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    inMemoryQuestionsAttachmentRepository.items.push(
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
      questionId:  newQuestion.id.toString(),
      title: 'Pergunta Teste',
      content: 'Conteúdo Teste',
      authorId: 'author-1',
      attachmentsIds: ['1','3'],
    })


    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
        title: 'Pergunta Teste',
        content: 'Conteúdo Teste'
    })

    expect(inMemoryQuestionRepository.items[0].attachments.currentItems)
    .toHaveLength(2)

    expect(inMemoryQuestionRepository.items[0].attachments.currentItems)
    .toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
    ]) 
  })

  it('should not be able to edit a question  from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)


    const result =  await sut.execute({
      questionId:  newQuestion.id.toString(),
      title: 'Pergunta Teste',
      content: 'Conteúdo Teste',
      authorId: 'author-2',
      attachmentsIds: []
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)


  })
})
