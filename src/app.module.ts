import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { InMemoryDbService } from './in-memory-db/in-memory-db.service';

@Module({
  imports: [SuperheroesModule],
  controllers: [AppController],
  providers: [AppService, InMemoryDbService],
  exports: [InMemoryDbService],
})
export class AppModule {}
