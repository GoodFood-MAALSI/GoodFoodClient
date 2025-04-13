import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateReviewDto } from "./create-review.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateReviewDto extends PartialType(OmitType(CreateReviewDto, ['userId'] as const)) {
  @ApiPropertyOptional({
    description: "Le commentaire de la revue (optionnel pour mise à jour)",
    example: "Mise à jour : produit toujours top !",
  })
  comment?: string;

  @ApiPropertyOptional({
    description: "La note attribuée (optionnel pour mise à jour)",
    example: 5,
  })
  rating?: number;
}