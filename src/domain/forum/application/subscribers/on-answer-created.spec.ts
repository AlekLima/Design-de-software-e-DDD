import { makeAnswer } from "@/test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { inMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { inMemoryAnswerAttachmentsRepository } from "@/test/repositories/in-memory-answers-attachments-repository"

let inMemoryAnswerRepository: inMemoryAnswersRepository
let inMemoryAnswerAttachmentRepository: inMemoryAnswerAttachmentsRepository

describe('On Answer Created', () => {
    beforeEach(() => {

        inMemoryAnswerAttachmentRepository = new inMemoryAnswerAttachmentsRepository()
        inMemoryAnswerRepository = new inMemoryAnswersRepository(inMemoryAnswerAttachmentRepository)
    })

    it('should send a notification when a new answer  is created', async () => {
        const onAnswerCreated = new OnAnswerCreated()

        const answer = makeAnswer()

        inMemoryAnswerRepository.create(answer)


    })
})