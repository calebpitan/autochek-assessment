import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { LocationController } from './location.controller'
import { LocationService } from './location.service'
import { Location } from './entity/location.entity'

describe('AccountController', () => {
  const locationMock = {
    id: 1,
    location_name: 'Lagos',
    description: 'Lagos in Nigeria',
    website: 'https://www.lagos.ng',
    phone: '07066001122',
    contact_person: 'Jamie Foxx',
    coordinates: { type: 'Point', coordinates: [6.4550575, 3.3941795] },
  }

  const locationRepo = {
    findOne: jest.fn(() => locationMock),
    find: jest.fn(() => [locationMock]),
    create: jest.fn(() => locationMock),
    update: jest.fn(() => locationMock),
    save: jest.fn(() => locationMock),
  }

  let controller: LocationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        LocationService,
        { provide: getRepositoryToken(Location), useValue: locationRepo },
      ],
    }).compile()

    controller = module.get<LocationController>(LocationController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
