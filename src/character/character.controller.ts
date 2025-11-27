import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) { }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Patch(':id/favorites/:locationId')
  addFavoriteLocation(@Param('id') id: string, @Param('locationId') locationId: string) {
    return this.characterService.addFavoriteLocation(+id, +locationId);
  }

  @Get(':id/taxes')
  calculateTaxes(@Param('id') id: string) {
    return this.characterService.calculateTaxes(+id);
  }
}
