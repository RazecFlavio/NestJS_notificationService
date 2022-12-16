import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (i) => i.id === notificationId,
    );
    if (!notification) {
      return null;
    }
    return notification;
  }
  async findManyByRecipient(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((i) => i.recipientId === recipientId);
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((i) => i.recipientId === recipientId)
      .length;
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (i) => i.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
