import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSearchHistoryDto } from './create-user_search_history.dto';

export class UpdateUserSearchHistoryDto extends PartialType(CreateUserSearchHistoryDto) {}
