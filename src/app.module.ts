import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
import { CharacterModule } from './character/character.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [TokenModule, CharacterModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
