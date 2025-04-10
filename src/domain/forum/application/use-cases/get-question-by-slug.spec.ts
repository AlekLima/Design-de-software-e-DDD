import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from '@/test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { inMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachments'

let inMemoryQuestionAttachmentsRepository: inMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: inMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new  inMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new inMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
        slug: Slug.create('example-question'),
    })

    

    await inMemoryQuestionRepository.create(newQuestion)


    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      })
    })
  })
})
