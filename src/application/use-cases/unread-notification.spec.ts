import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

import { UnreadNotification } from './unread-notification';

describe('Red notification', () => {
  it('should be able to Unread a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(repository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await repository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(repository.notifications[0].readAt).toBeNull();
  });
  it('should not be able to Unread a non existing notification', () => {
    const repository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(repository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
