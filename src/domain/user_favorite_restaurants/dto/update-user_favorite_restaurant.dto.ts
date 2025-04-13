import { PartialType } from "@nestjs/mapped-types";
import { CreateUserFavoriteRestaurantDto } from "./create-user_favorite_restaurant.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserFavoriteRestaurantDto extends PartialType(CreateUserFavoriteRestaurantDto) {
  @ApiPropertyOptional({
    description: "L'identifiant de l'utilisateur (optionnel pour mise à jour)",
    example: 1,
  })
  userId?: number;

  @ApiPropertyOptional({
    description: "L'identifiant du restaurant favori (optionnel pour mise à jour)",
    example: 42,
  })
  restaurant_id?: number;
}