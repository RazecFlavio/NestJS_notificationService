import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['profound-duck-14076-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'cHJvZm91bmQtZHVjay0xNDA3NiSMkm7S5sbk7Kk75uUadNRMUTsuka8GMAlUPRM',
          password:
            '9ZD2phcorqh4UiZmoO72S-JV6886EMHeWrm8yaUdOEsS7Z7kbtNS3Ft_3mhIgZkPBt0dXA==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
