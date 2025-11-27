import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) { }

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Post('validate')
  validate(@Body('token') token: string) {
    return this.tokenService.validate(token);
  }

  @Get()
  findAll() {
    return this.tokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(id);
  }

  @Patch('reduce/:id')
  reduce(@Param('id') id: string) {
    return this.tokenService.reduce(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenService.remove(id);
  }
}
