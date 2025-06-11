import { IsNotEmpty, IsNumber } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/domain/users/entities/user.entity";
import { IsEntityExists } from "src/domain/utils/validators/is-entity-exists.validator";

export class CreateUserFavoriteRestaurantDto {
  @ApiProperty({ example: 2, description: 'ID du user' })
  @IsNumber()
  @IsNotEmpty()
  @IsEntityExists(User, {
    message: "L'utilisateur n'existe pas",
  })
  userId: number;

  @ApiProperty({
    description: "L'identifiant du restaurant favori",
    example: 42,
  })
  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;
}