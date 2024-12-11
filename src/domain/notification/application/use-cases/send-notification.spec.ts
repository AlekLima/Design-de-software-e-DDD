import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { inMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'


let inMemoryNotificationRepository: inMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
      inMemoryNotificationRepository = new inMemoryNotificationsRepository()
      sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to send a notification', async () => {

    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteudo da notificação',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0].id).toEqual(
        result.value?.notification,
    )
  })  
})
