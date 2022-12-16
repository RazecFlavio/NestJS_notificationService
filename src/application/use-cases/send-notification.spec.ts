import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notifications';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const repository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(repository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(repository.notifications).toHaveLength(1);
    expect(repository.notifications[0]).toEqual(notification);
  });
});
