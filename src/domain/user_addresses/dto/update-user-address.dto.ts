import { PartialType } from "@nestjs/mapped-types";
import { CreateUserAddressDto } from "./create-user-address.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {
  @ApiPropertyOptional({
    description: "L'identifiant de l'utilisateur associé à cette adresse",
    example: 1,
    type: Number,
  })
  userId?: number;

  @ApiPropertyOptional({
    description: 'Le numéro de la rue (ex. "12bis")',
    example: '12bis',
    type: String,
  })
  street_number?: string;

  @ApiPropertyOptional({
    description: 'Le nom de la rue',
    example: 'Rue des Lilas',
    type: String,
  })
  street?: string;

  @ApiPropertyOptional({
    description: 'La ville',
    example: 'Paris',
    type: String,
  })
  city?: string;

  @ApiPropertyOptional({
    description: 'Le code postal',
    example: '75001',
    type: String,
  })
  postal_code?: string;

  @ApiPropertyOptional({
    description: 'Le pays',
    example: 'France',
    type: String,
  })
  country?: string;

  @ApiPropertyOptional({
    description: "Indique si cette adresse est l'adresse par défaut de l'utilisateur",
    example: true,
    type: Boolean,
  })
  is_default?: boolean;
}