import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { CharacterService } from '../character/character.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, CharacterService],
  imports: [TypeOrmModule.forFeature([Location])],
})
export class LocationModule { }
