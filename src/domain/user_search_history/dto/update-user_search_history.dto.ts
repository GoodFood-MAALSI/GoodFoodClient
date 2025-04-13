import { PartialType } from "@nestjs/mapped-types";
import { CreateUserSearchHistoryDto } from "./create-user_search_history.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserSearchHistoryDto extends PartialType(CreateUserSearchHistoryDto) {
  @ApiPropertyOptional({
    description: "La requête de recherche effectuée par l'utilisateur (optionnel pour mise à jour)",
    example: "restaurants italiens Paris",
    type: String,
  })
  search_query?: string;
}