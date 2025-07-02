import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { UserSearchHistoryService } from './user_search_history.service';
import { CreateUserSearchHistoryDto } from './dto/create-user_search_history.dto';

@Controller('user-search-history')
export class UserSearchHistoryController {
  constructor(
    private readonly userSearchHistoryService: UserSearchHistoryService,
  ) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: "Récupérer l'historique de recherche de l'utilisateur connecté",
  })
  async getMySearchHistory(@Req() req: Request) {
    const user = req.user;
    if (!user || !user.id) {
      throw new HttpException(
        'Utilisateur non authentifié',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.userSearchHistoryService.findByUser(user.id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Ajouter un historique de recherche' })
  @ApiBody({ type: CreateUserSearchHistoryDto })
  async create(
    @Body() createUserSearchHistoryDto: CreateUserSearchHistoryDto,
    @Req() req: Request,
  ) {
    try {
      const user = req.user;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const createdUserSearchHistory =
        await this.userSearchHistoryService.create({
          ...createUserSearchHistoryDto,
          userId: user.id,
        });

      return createdUserSearchHistory;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create search history',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Supprimer un historique de recherche précis' })
  async remove(@Param('id') id: string) {
    return this.userSearchHistoryService.remove(+id);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Supprimer tout l'historique de recherche de l'utilisateur connecté" })
  async removeAll(@Req() req: Request) {
    const user = req.user;
    if (!user || !user.id) {
      throw new HttpException(
        'Utilisateur non authentifié',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const searchHistories = await this.userSearchHistoryService.findByUser(user.id);
    if (searchHistories.length === 0) {
      throw new HttpException(
        'Aucun historique de recherche trouvé',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userSearchHistoryService.removeAll(user.id);
  }
}