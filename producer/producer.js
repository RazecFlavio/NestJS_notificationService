// import { Kafka } from "kafkajs";
// import { randomUUID } from "node:crypto";
const { Kafka } = require("kafkajs");
const { randomUUID } = require("node:crypto");

async function bootstrap() {
  const kafka = new Kafka({
    brokers: ["profound-duck-14076-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username:
        "cHJvZm91bmQtZHVjay0xNDA3NiSMkm7S5sbk7Kk75uUadNRMUTsuka8GMAlUPRM",
      password:
        "9ZD2phcorqh4UiZmoO72S-JV6886EMHeWrm8yaUdOEsS7Z7kbtNS3Ft_3mhIgZkPBt0dXA==",
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitação de amizade",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });
  await producer.disconnect();
}
bootstrap();
