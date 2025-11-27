import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { TokenGuard } from '../token/token.guard';
import { TokenInterceptor } from '../token/token.interceptor';

@Controller('character')
@UseGuards(TokenGuard)
@UseInterceptors(TokenInterceptor) // Reduce el token tras ejecución exitosa
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Patch(':id/favorites/:locationId')
  addFavoriteLocation(
    @Param('id') id: string,
    @Param('locationId') locationId: string,
  ) {
    return this.characterService.addFavoriteLocation(+id, +locationId);
  }

  @Get(':id/taxes')
  calculateTaxes(@Param('id') id: string) {
    return this.characterService.calculateTaxes(+id);
  }
}
