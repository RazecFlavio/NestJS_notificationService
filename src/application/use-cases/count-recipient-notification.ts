import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface CountRecepientNotificationsRequest {
  recipientId: string;
}

interface CountRecepientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecepientNotifications {
  constructor(private repository: NotificationsRepository) {}

  async execute(
    request: CountRecepientNotificationsRequest,
  ): Promise<CountRecepientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.repository.countManyByRecipientId(recipientId);

    return { count };
  }
}
