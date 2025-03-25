import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";

export class CreateReviewDto {
        @IsNotEmpty()
        @IsString()
        comment: string;

        @IsNumber()
        @IsNotEmpty()
        rating: number;
}
