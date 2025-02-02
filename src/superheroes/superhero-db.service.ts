import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { Superhero } from './entities/superhero.entity';

@Injectable()
export class SuperheroDbService extends InMemoryDbService<Superhero> {}
