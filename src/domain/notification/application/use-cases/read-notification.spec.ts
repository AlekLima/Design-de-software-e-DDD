import { inMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from '@/test/factories/make-notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'


let inMemoryNotificationRepository: inMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
      inMemoryNotificationRepository = new inMemoryNotificationsRepository()
      sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
        expect.any(UniqueEntityID),
    )
  })
  
  it('should not be able to read a notification from another user', async () => {
      const notification = makeNotification({
        recipientId: new UniqueEntityID('recipient-1')
      }
    )

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
        notificationId:  notification.id.toString(),
        recipientId: 'recipient-2'
      })
  

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)


  })
})
