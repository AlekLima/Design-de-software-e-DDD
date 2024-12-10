import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { inMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachments'


let inMemoryQuestionRepository: inMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: inMemoryQuestionAttachmentRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = 
      new inMemoryQuestionAttachmentRepository()
      
    inMemoryQuestionRepository = new inMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {

    const result = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteudo da pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0].id).toEqual(result.value?.question.id)
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') })

    ])

  })  
})
