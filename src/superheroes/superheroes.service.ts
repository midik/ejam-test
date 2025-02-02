import { Get, Injectable, Post } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { Superhero } from './entities/superhero.entity';
import { SuperheroDbService } from './superhero-db.service';

@Injectable()
export class SuperheroesService {
  constructor(private readonly dbService: SuperheroDbService) {}

  @Post()
  create(createSuperheroDto: CreateSuperheroDto) {
    // keep dto-to-entity mapping out of in-memory-db-service
    //  to reduce its coupling to the Superhero-related things
    const entity: Superhero = {
      name: createSuperheroDto.name,
      superPower: createSuperheroDto.superPower,
      humilityScore: createSuperheroDto.humilityScore,
    } as Superhero;

    return this.dbService.create(entity);
  }

  @Get()
  findAll() {
    return this.dbService.findAll();
  }
}
