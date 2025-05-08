import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ClientOrdersService } from './client-orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('client-orders')
export class ClientOrdersController {
  constructor(private readonly clientOrdersService: ClientOrdersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.clientOrdersService.createOrder(createOrderDto);
  }

  //PAS OPE
  @Get(':id')
  async getOrder(@Param('id') id: number) {
    return this.clientOrdersService.getOrder(id);
  }
}
