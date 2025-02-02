import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Injectable()
export class SuperheroesService {
  create(createSuperheroDto: CreateSuperheroDto) {
    return 'This action adds a new superhero';
  }

  findAll() {
    return `This action returns all superheroes`;
  }
}
