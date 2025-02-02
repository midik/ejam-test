import { Injectable } from '@nestjs/common';
import { Superhero } from './entities/superhero.entity';
import { InMemoryDbService } from '../in-memory-db/in-memory-db.service';

@Injectable()
export class SuperheroDbService extends InMemoryDbService<Superhero> {}
