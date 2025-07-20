import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { InterserviceAuthGuardFactory } from '../interservice/guards/interservice-auth.guard';

@Controller('user-addresses')
export class UserAddressesController {
  constructor(private readonly userAddressesService: UserAddressesService) {}

  @Get('me')
  @UseGuards(InterserviceAuthGuardFactory(['client']))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Récupérer les adresses de l'utilisateur connecté" })
  async getMyAddresses(@Req() req: Request) {
    const user = req.user;
    if (!user || !user.id) {
      throw new HttpException(
        'Utilisateur non authentifié',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.userAddressesService.findByUser(user.id);
  }

  @Post()
  @UseGuards(InterserviceAuthGuardFactory(['client']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ajouter une adresse' })
  @ApiBody({ type: CreateUserAddressDto })
  async create(
    @Body() createUserAddressDto: CreateUserAddressDto,
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

      const createdAddress = await this.userAddressesService.create(
        createUserAddressDto,
        user.id,
      );

      return createdAddress;
    } catch (error) {
      throw new HttpException(
        {
          message: "Échec de la création de l'adresse",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @UseGuards(InterserviceAuthGuardFactory(['client']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer une adresse' })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    try {
      const addressId = parseInt(id);
      if (isNaN(addressId)) {
        throw new HttpException('ID invalide', HttpStatus.BAD_REQUEST);
      }

      const user = req.user;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return await this.userAddressesService.findOne(addressId, user.id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: "Échec de la récupération de l'adresse",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @UseGuards(InterserviceAuthGuardFactory(['client']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour une adresse' })
  async update(
    @Param('id') id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
    @Req() req: Request,
  ) {
    try {
      const addressId = parseInt(id);
      if (isNaN(addressId)) {
        throw new HttpException('ID invalide', HttpStatus.BAD_REQUEST);
      }

      const user = req.user;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return await this.userAddressesService.update(
        addressId,
        updateUserAddressDto,
        user.id,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: "Échec de la mise à jour de l'adresse",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @UseGuards(InterserviceAuthGuardFactory(['client']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer une adresse' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    try {
      const addressId = parseInt(id);
      if (isNaN(addressId)) {
        throw new HttpException('ID invalide', HttpStatus.BAD_REQUEST);
      }

      const user = req.user;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }

      await this.userAddressesService.remove(addressId, user.id);
      return { message: 'Adresse supprimée avec succès' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: "Échec de la suppression de l'adresse",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}