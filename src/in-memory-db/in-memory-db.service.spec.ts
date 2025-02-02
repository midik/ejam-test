import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryDbService } from './in-memory-db.service';
import { Superhero } from '../superheroes/entities/superhero.entity';

describe('InMemoryDbService', () => {
  let service: InMemoryDbService<Superhero>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryDbService],
    }).compile();

    service = module.get<InMemoryDbService<Superhero>>(InMemoryDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
