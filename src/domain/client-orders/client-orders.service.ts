import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class ClientOrdersService implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('order-details-request');
    await this.kafkaClient.connect();
    console.log('ClientOrdersService: Connected to Kafka and subscribed to response of order-details-request');
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const message = {
      value: JSON.stringify(createOrderDto),
    };
    console.log('ClientOrdersService: Sending message to Kafka topic client-orders:', createOrderDto);
    await this.kafkaClient.emit('client-orders', message);
    return { message: 'Commande envoyée avec succès via Kafka' };
  }

  //PAS OPE
  async getOrder(id: number) {
    const message = {
      value: JSON.stringify({ id }),
    };
    console.log('ClientOrdersService: Sending request to Kafka topic order-details-request:', { id });
    try {
      const response = await firstValueFrom(
        this.kafkaClient.send('order-details-request', message).pipe(
          timeout(10000) // Timeout de 10 secondes
        )
      );
      console.log('ClientOrdersService: Received response:', response);
      return response;
    } catch (error) {
      console.error('ClientOrdersService: Error receiving response:', error.message || error);
      throw new Error(`Failed to get order with id ${id}: ${error.message || error}`);
    }
  }
}