import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { SuperheroDbService } from './superhero-db.service';
import { SuperheroesController } from './superheroes.controller';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [SuperheroesService, SuperheroDbService],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
