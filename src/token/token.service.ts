import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createTokenDto);
    return await this.tokenRepository.save(token);
  }

  async findAll() {
    return await this.tokenRepository.find();
  }

  async findOne(id: string) {
    const token = await this.tokenRepository.findOneBy({ id });
    if (!token) {
      throw new NotFoundException(`Token with ID ${id} not found`);
    }
    return token;
  }

  // Método nuevo para el Interceptor
  async findByToken(tokenString: string) {
    return await this.tokenRepository.findOneBy({ token: tokenString });
  }

  async reduce(id: string) {
    const token = await this.findOne(id);
    if (token.reqLeft <= 0) {
      throw new Error('No requests left');
    }
    token.reqLeft -= 1;
    return await this.tokenRepository.save(token);
  }

  async remove(id: string) {
    const token = await this.findOne(id);
    return await this.tokenRepository.remove(token);
  }

  async validate(tokenString: string): Promise<boolean> {
    const token = await this.tokenRepository.findOneBy({ token: tokenString });
    if (!token) return false;
    if (!token.active) return false;
    if (token.reqLeft <= 0) return false;
    return true;
  }
}
