import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserSearchHistoryDto {
  @ApiProperty({
    description: "La requête de recherche effectuée par l'utilisateur",
    example: "restaurants italiens Paris",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  search_query: string;
}