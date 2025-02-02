import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesModule } from '../src/superheroes/superheroes.module';

describe('e2e / superheroes ', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SuperheroesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /superheroes', async () => {
    const superheroDto = {
      name: 'Batman',
      superPower: 'Rich & Smart',
      humilityScore: 70,
    };

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(superheroDto)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number) as number,
      ...superheroDto,
    });
  });

  it('GET /superheroes', async () => {
    const response = await request(app.getHttpServer())
      .get('/superheroes')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: expect.any(Number) as number,
        name: 'Batman',
        superPower: 'Rich & Smart',
        humilityScore: 70,
      },
    ]);
  });
});
