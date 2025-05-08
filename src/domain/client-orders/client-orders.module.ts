import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientOrdersController } from './client-orders.controller';
import { ClientOrdersService } from './client-orders.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'client-service',
            brokers: ['my-kafka-cluster-kafka-brokers.kafka.svc:9092'],
          },
          consumer: {
            groupId: 'client-consumer-group',
          },
          producer: {
            allowAutoTopicCreation: true,
          },
          subscribe: {
            fromBeginning: false,
          },
        },
      },
    ]),
  ],
  controllers: [ClientOrdersController],
  providers: [ClientOrdersService],
})
export class ClientOrdersModule {}