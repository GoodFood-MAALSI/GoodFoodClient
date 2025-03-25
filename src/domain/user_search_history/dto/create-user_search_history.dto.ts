import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateUserSearchHistoryDto {
      @IsNotEmpty()
      @IsString()
      search_query: string;
}
