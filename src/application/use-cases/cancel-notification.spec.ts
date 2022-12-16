import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(repository);

    const notification = makeNotification();

    await repository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(repository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });
  it('should not be able to cancel a non existing notification', () => {
    const repository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(repository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
