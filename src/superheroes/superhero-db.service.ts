import { Injectable } from '@nestjs/common';
import { Superhero } from './entities/superhero.entity';
import { InMemoryDbService } from '../in-memory-db/in-memory-db.service';

// This service narrows downs the InMemoryDbService with generics
//  to provide the in-memory database for the Superhero module,
//  because we can't inject the generics directly into the InMemoryDbService.

@Injectable()
export class SuperheroDbService extends InMemoryDbService<Superhero> {}
