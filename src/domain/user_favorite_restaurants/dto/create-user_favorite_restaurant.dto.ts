import { IsNotEmpty, IsNumber } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserFavoriteRestaurantDto {
  @ApiProperty({
    description: "L'identifiant de l'utilisateur",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: "L'identifiant du restaurant favori",
    example: 42,
  })
  @IsNotEmpty()
  @IsNumber()
  restaurant_id: number;
}