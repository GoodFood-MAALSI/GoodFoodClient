import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSearchHistoryService } from './user_search_history.service';
import { CreateUserSearchHistoryDto } from './dto/create-user_search_history.dto';
import { UpdateUserSearchHistoryDto } from './dto/update-user_search_history.dto';

@Controller('user-search-history')
export class UserSearchHistoryController {
  constructor(private readonly userSearchHistoryService: UserSearchHistoryService) {}

  @Post()
  create(@Body() createUserSearchHistoryDto: CreateUserSearchHistoryDto) {
    return this.userSearchHistoryService.create(createUserSearchHistoryDto);
  }

  @Get()
  findAll() {
    return this.userSearchHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSearchHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSearchHistoryDto: UpdateUserSearchHistoryDto) {
    return this.userSearchHistoryService.update(+id, updateUserSearchHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSearchHistoryService.remove(+id);
  }
}
