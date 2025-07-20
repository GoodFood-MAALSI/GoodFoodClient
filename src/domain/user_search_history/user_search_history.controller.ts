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
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { UserSearchHistoryService } from './user_search_history.service';
import { CreateUserSearchHistoryDto } from './dto/create-user_search_history.dto';
import { InterserviceAuthGuardFactory } from '../interservice/guards/interservice-auth.guard';

@Controller('user-search-history')
export class UserSearchHistoryController {
  constructor(
    private readonly userSearchHistoryService: UserSearchHistoryService,
  ) {}

  @Get('me')
  @UseGuards(InterserviceAuthGuardFactory(['client']))
  @ApiBearerAuth()
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
  @UseGuards(InterserviceAuthGuardFactory(['client']))
  @ApiBearerAuth()
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
        await this.userSearchHistoryService.create(
          createUserSearchHistoryDto,
          user.id,
        );

      return createdUserSearchHistory;
    } catch (error) {
      throw new HttpException(
        {
          message: "Échec de la création de l'historique de recherche",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @UseGuards(InterserviceAuthGuardFactory(['client']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un historique de recherche précis' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    try {
      const searchHistoryId = parseInt(id);
      if (isNaN(searchHistoryId)) {
        throw new HttpException('ID invalide', HttpStatus.BAD_REQUEST);
      }

      const user = req.user;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }

      await this.userSearchHistoryService.remove(searchHistoryId, user.id);
      return { message: 'Historique de recherche supprimé avec succès' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: "Échec de la suppression de l'historique de recherche",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete()
  @UseGuards(InterserviceAuthGuardFactory(['client']))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Supprimer tout l'historique de recherche de l'utilisateur connecté" })
  async removeAll(@Req() req: Request) {
    try {
      const user = req.user;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }

      await this.userSearchHistoryService.removeAll(user.id);
      return { message: "Tout l'historique de recherche a été supprimé avec succès" };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: "Échec de la suppression de l'historique de recherche",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}