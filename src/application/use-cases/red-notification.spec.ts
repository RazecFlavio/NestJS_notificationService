import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Red notification', () => {
  it('should be able to read a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(repository);

    const notification = makeNotification();

    await repository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(repository.notifications[0].readAt).toEqual(expect.any(Date));
  });
  it('should not be able to read a non existing notification', () => {
    const repository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(repository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
