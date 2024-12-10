import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { inMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { inMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answers-attachments-repository'

let inMemoryAnswerAttachmentRepository: inMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository: inMemoryAnswersRepository
let sut: AnswerQuestionUseCase




describe('Create  Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository = new inMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new inMemoryAnswersRepository(inMemoryAnswerAttachmentRepository)
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    

    const result = await sut.execute({
      questionId: '1',
      InstructorId: 'Nova pergunta',
      content: 'Conteudo da resposta',
      attachmentsIds: ['1', '2'],
    })

    

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems)
    .toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems)
    .toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') })
    ]) 
  })
})
