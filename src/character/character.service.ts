/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Location } from '../location/entities/location.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create({
      ...createCharacterDto,
      property: createCharacterDto.property
        ? { id: createCharacterDto.property }
        : undefined,
      favPlaces: createCharacterDto.favPlaces
        ? createCharacterDto.favPlaces.map((id) => ({ id }))
        : undefined,
    });
    return this.characterRepository.save(character);
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.findOne(id);
    if (character) {
      const updateData: any = {
        ...updateCharacterDto,
      };

      if (updateCharacterDto.property !== undefined) {
        updateData.property = updateCharacterDto.property
          ? { id: updateCharacterDto.property }
          : null;
      }

      if (updateCharacterDto.favPlaces !== undefined) {
        updateData.favPlaces = updateCharacterDto.favPlaces
          ? updateCharacterDto.favPlaces.map((id) => ({ id }))
          : [];
      }

      return this.characterRepository.update(id, updateData);
    }
    throw new NotFoundException(`Character with id ${id} not found`);
  }

  findOne(id: number) {
    return this.characterRepository.findOne({
      where: { id },
      relations: ['property', 'favPlaces'],
    });
  }

  async calculateTaxes(id: number) {
    const character = await this.findOne(id);
    if (character) {
      const employee = character.employee;
      const property = character.property;

      if (property) {
        let coef = 0;
        if (employee) {
          coef = 0.08;
        } else {
          coef = 0.03;
        }
        // Fórmula corregida: COSTO_LOCATION * (1 + COEF.)
        return { taxDebt: property.cost * (1 + coef) };
      } else {
        return { taxDebt: 0 };
      }
    }
    throw new NotFoundException(`Character with id ${id} not found`);
  }

  async addFavoriteLocation(id: number, favPlaceId: number) {
    const character = await this.findOne(id);
    if (!character)
      throw new NotFoundException(`Character with id ${id} not found`);

    // Verificamos si ya existe para no duplicar
    if (character.favPlaces.some((place) => place.id === favPlaceId)) {
      throw new Error('Character already has this favorite place');
    }

    // Agregamos solo la referencia por ID
    character.favPlaces.push({ id: favPlaceId } as Location);
    return this.characterRepository.save(character);
  }
}
