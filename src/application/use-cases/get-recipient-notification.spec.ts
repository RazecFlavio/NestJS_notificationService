import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { GetRecipientNotifications } from './get-recipient-notification';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const repository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(repository);

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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
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
