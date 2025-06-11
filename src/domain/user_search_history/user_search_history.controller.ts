// import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
// import { UserSearchHistoryService } from './user_search_history.service';
// import { CreateUserSearchHistoryDto } from './dto/create-user_search_history.dto';
// import { UpdateUserSearchHistoryDto } from './dto/update-user_search_history.dto';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('user-search-history')
// export class UserSearchHistoryController {
//   constructor(private readonly userSearchHistoryService: UserSearchHistoryService) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'))
//   create(@Body() createUserSearchHistoryDto: CreateUserSearchHistoryDto, @Request() req) {
//     return this.userSearchHistoryService.create(createUserSearchHistoryDto, req.user.id);
//   }

//   @Get()
//   findAll() {
//     return this.userSearchHistoryService.findAll();
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.userSearchHistoryService.remove(+id);
//   }
// }