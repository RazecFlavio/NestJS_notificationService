import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notifications';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { PrismaNotificationMapper } from '@infra/database/prisma/mappers/prisma-notification-mapper';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecepientNotifications } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private _send: SendNotification,
    private _cancel: CancelNotification,
    private _read: ReadNotification,
    private _unread: UnreadNotification,
    private _count: CountRecepientNotifications,
    private _get: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this._cancel.execute({
      notificationId: id,
    });
  }
  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this._read.execute({
      notificationId: id,
    });
  }
  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this._unread.execute({
      notificationId: id,
    });
  }
  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this._count.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this._get.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(PrismaNotificationMapper.toHTTPView),
    };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this._send.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: PrismaNotificationMapper.toHTTPView(notification),
    };
  }
}
