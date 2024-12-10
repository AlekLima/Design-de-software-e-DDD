import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { inMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachments'


let inMemoryQuestionAttachmentsRepository: inMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: inMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new inMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new inMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent questions', async () => {
    
    await inMemoryQuestionRepository.create(
        makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )

    await inMemoryQuestionRepository.create(
        makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )

    await inMemoryQuestionRepository.create(
        makeQuestion({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
        page: 1,
    })

    expect(result.value?.questions).toEqual([
        expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
        expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
        expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),

    ])
  })

  it('should be able to fetch recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
        await inMemoryQuestionRepository.create(
            makeQuestion({ createdAt: new Date(2022, 0, 20) }),
        )
    }

    
    const result = await sut.execute({
        page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
