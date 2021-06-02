import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  const locationDtoMock = {
    location_name: 'Lagos',
    description: 'Lagos in Nigeria',
    website: 'https://www.lagos.ng',
    phone: '07066001122',
    contact_person: 'Jamie Foxx',
    coordinates: [6.4550575, 3.3941795],
  }

  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/location (POST)', async () => {
    const req = await request(app.getHttpServer()).post('/location').send(locationDtoMock)

    expect(req.statusCode).toStrictEqual(201)
    expect(req.body).toMatchSnapshot()
  })

  it('/location (GET)', async () => {
    const req = await request(app.getHttpServer()).get('/location')
    expect(req.statusCode).toStrictEqual(200)
    expect(req.body).toMatchSnapshot()
  })

  it('/location/:id (GET)', async () => {
    const req = await request(app.getHttpServer()).get('/location/1')
    expect(req.statusCode).toStrictEqual(200)
    expect(req.body).toMatchSnapshot()
  })

  it('/location/1 (PUT)', async () => {
    const req = await request(app.getHttpServer())
      .put('/location/1')
      .send({ ...locationDtoMock, contact_person: 'Jide Sanwolu' })

    expect(req.statusCode).toStrictEqual(200)
    expect(req.body).toMatchSnapshot()
  })

  it('/location/1 (DELETE)', async () => {
    const req = await request(app.getHttpServer()).delete('/location/1')

    expect(req.statusCode).toStrictEqual(200)
    expect(req.body).toMatchSnapshot()
  })
})
