import { Module } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroDbService } from './superhero-db.service';

@Module({
  controllers: [SuperheroesController],
  providers: [SuperheroesService, SuperheroDbService],
  exports: [SuperheroDbService],
})
export class SuperheroesModule {}
