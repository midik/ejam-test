import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesModule } from '../src/superheroes/superheroes.module';
import { SuperheroDbService } from '../src/superheroes/superhero-db.service';

// e2e tests for superheroes module, broken down by routes,
//   positive and negative scenarios, and so on :)

describe('e2e / superheroes ', () => {
  let app: INestApplication;

  // simple mock data
  const mockData = [
    {
      name: 'Batman',
      superPower: 'Rich & Smart',
      humilityScore: 7,
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [SuperheroDbService],
      imports: [SuperheroesModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // attach global validation pipe
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // since we runInBand this, we set our expectations to intermediate states,
  //   so we don't have to rollback / cleanup DB before each test.
  // However, that makes using of .only or .skip for certain tests not always possible.

  // here we could maintain the state of the DB between tests
  // beforeEach(() => {
  //   app.get(SuperheroDbService).truncate();
  // });

  afterAll(async () => {
    await app.close();
  });

  it('GET /superheroes - no records', async () => {
    const response = await request(app.getHttpServer())
      .get('/superheroes')
      .expect(200);

    expect(response.body).toEqual([]);
  });

  describe('POST /superheroes', () => {
    describe('positive', () => {
      it('should return proper object', async () => {
        const superheroDto = mockData[0];

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

  it('GET /superheroes - one record', async () => {
    const response = await request(app.getHttpServer())
      .get('/superheroes')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: expect.any(Number) as number,
        ...mockData[0],
      },
    ]);
  });
});
