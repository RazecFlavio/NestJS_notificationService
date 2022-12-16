import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecepientNotifications } from './count-recipient-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const repository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecepientNotifications(
      repository,
    );

    await repository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );
    await repository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );
    await repository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
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
