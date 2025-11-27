import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
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
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { owner, ...rest } = createLocationDto;
    const character = await this.characterRepository.findOne({
      where: { id: owner },
      relations: ['property'],
    });

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    if (character.property) {
      throw new BadRequestException('Character already has a property');
    }

    // 1. Guardamos la Location primero para generar su ID
    const location = this.locationRepository.create({
      ...rest,
      owner: character,
    });
    const savedLocation = await this.locationRepository.save(location);

    // 2. Actualizamos el Character con la Location ya guardada
    await this.characterRepository.update(owner, { property: savedLocation });

    return savedLocation;
  }

  findAll() {
    return this.locationRepository.find({ relations: ['favorites'] });
  }
}
