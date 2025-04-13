import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({
    description: "Le commentaire de la revue",
    example: "Excellent produit, je recommande !",
  })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({
    description: "La note attribuée (entre 1 et 5 par exemple)",
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: "L'identifiant de l'utilisateur qui a créé la revue",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}