import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { TokenGuard } from '../token/token.guard';
import { TokenInterceptor } from '../token/token.interceptor';

@Controller('location')
@UseGuards(TokenGuard)
@UseInterceptors(TokenInterceptor) // Reduce el token tras ejecución exitosa
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }
}
