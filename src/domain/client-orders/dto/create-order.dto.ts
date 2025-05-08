import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: "ID de l'utilisateur" })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'ID du livreur' })
  @IsNumber()
  @IsNotEmpty()
  deliverer_id: number;

  @ApiProperty({ description: 'ID du restaurant' })
  @IsNumber()
  @IsNotEmpty()
  restaurant_id: number;

  @ApiProperty({ description: 'ID du statut de la commande' })
  @IsNumber()
  @IsNotEmpty()
  statut_id: number;

  @ApiProperty({ description: 'Description de la commande', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Sous-total', example: 49.99 })
  @IsNumber()
  @IsNotEmpty()
  subtotal: number;

  @ApiProperty({ description: 'Frais de livraison', example: 4.50 })
  @IsNumber()
  @IsNotEmpty()
  delivery_costs: number;

  @ApiProperty({ description: 'Frais de service', example: 2.00 })
  @IsNumber()
  @IsNotEmpty()
  service_charge: number;

  @ApiProperty({ description: 'Remise globale', example: 5.00 })
  @IsNumber()
  @IsNotEmpty()
  global_discount: number;
}