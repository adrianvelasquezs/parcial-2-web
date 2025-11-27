import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { Character } from '../character/entities/character.entity';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) { }

  async create(createLocationDto: CreateLocationDto) {
    const { owner, ...rest } = createLocationDto;
    const character = await this.characterRepository.findOne({ where: { id: owner }, relations: ['property'] });
    if (character != null) {
      const { property } = character;
      if (property) {
        throw new Error('Character already has a property');
      }
      const location = this.locationRepository.create({ ...rest });
      character.property = location;
      this.characterRepository.update(owner, { property: { id: location.id } });
      return this.locationRepository.save(location);
    }
    throw new Error('Character not found');
  }

  findAll() {
    return this.locationRepository.find();
  }
}
