import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesModule } from '../src/superheroes/superheroes.module';

describe('e2e / superheroes ', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SuperheroesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /superheroes', () => {
    describe('positive', () => {
      it('should return proper object', async () => {
        const superheroDto = {
          name: 'Batman',
          superPower: 'Rich & Smart',
          humilityScore: 7,
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
    });

    describe('negative', () => {
      it('should return 400 on invalid input', async () => {
        const superheroDto = {
          name: 'Batman',
          superPower: 'Rich & Smart',
          humilityScore: 'qwe',
        };

        await request(app.getHttpServer())
          .post('/superheroes')
          .send(superheroDto)
          .expect(400);
      });
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
