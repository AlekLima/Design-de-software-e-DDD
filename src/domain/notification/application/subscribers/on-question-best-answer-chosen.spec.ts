import { makeAnswer } from "@/test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { inMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { inMemoryAnswerAttachmentsRepository } from "@/test/repositories/in-memory-answers-attachments-repository"
import { inMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { inMemoryQuestionAttachmentRepository } from "@/test/repositories/in-memory-question-attachments"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "@/domain/notification/application/use-cases/send-notification"
import { inMemoryNotificationsRepository } from "@/test/repositories/in-memory-notifications-repository"
import { SpyInstance, vi } from "vitest"
import { makeQuestion } from "@/test/factories/make-question"
import { waitFor } from "@/test/utils/wait-for"
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen"

let inMemoryQuestionAttachmentsRepository: inMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: inMemoryQuestionsRepository
let inMemoryAnswerRepository: inMemoryAnswersRepository
let inMemoryNotificationRepository: inMemoryNotificationsRepository
let inMemoryAnswerAttachmentRepository: inMemoryAnswerAttachmentsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
[SendNotificationUseCaseRequest],
Promise<SendNotificationUseCaseResponse>
>

describe('On Question Best Answer Chosen', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = 
        new inMemoryQuestionAttachmentRepository()

        inMemoryQuestionRepository = new inMemoryQuestionsRepository(
            inMemoryQuestionAttachmentsRepository,
        )

        inMemoryAnswerAttachmentRepository =
         new inMemoryAnswerAttachmentsRepository()

        inMemoryAnswerRepository = new inMemoryAnswersRepository(
            inMemoryAnswerAttachmentRepository
        )

        sendNotificationUseCase = new SendNotificationUseCase(
            inMemoryNotificationRepository
        )

        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

        new OnQuestionBestAnswerChosen(inMemoryAnswerRepository, sendNotificationUseCase)
    })

    it('should send a notification when topic has new best answer chosen', async () => {
        const question = makeQuestion()
        const answer = makeAnswer({ questionId: question.id })

        
        inMemoryQuestionRepository.create(question)
        inMemoryAnswerRepository.create(answer)

        question.bestAnswerId = answer.id

        inMemoryQuestionRepository.save(question)

        expect(sendNotificationExecuteSpy).toHaveBeenCalled()

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled()
        })

        
    })
})