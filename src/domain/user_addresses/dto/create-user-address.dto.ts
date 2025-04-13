import { IsString, IsNotEmpty, IsBoolean, IsOptional } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAddressDto {
  @ApiProperty({
    description: "L'identifiant de l'utilisateur associé à cette adresse",
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Le numéro de la rue (ex. "12bis")',
    example: '12bis',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  street_number: string;

  @ApiProperty({
    description: 'Le nom de la rue',
    example: 'Rue des Lilas',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({
    description: 'La ville',
    example: 'Paris',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Le code postal',
    example: '75001',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @ApiProperty({
    description: 'Le pays',
    example: 'France',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: "Indique si cette adresse est l'adresse par défaut de l'utilisateur",
    example: true,
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_default: boolean;
}