import { Test, TestingModule } from '@nestjs/testing'
import { LocationService } from './location.service'
import { Location } from './entity/location.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('AccountService', () => {
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

  let service: LocationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        { provide: getRepositoryToken(Location), useValue: locationRepo },
      ],
    }).compile()

    service = module.get<LocationService>(LocationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('#findOne', async () => {
    const location = await service.findOne(1)
    expect(locationRepo.findOne).toHaveBeenCalled()
    expect(location).toMatchObject(locationMock)
  })

  it('#findAll', async () => {
    const location = await service.findAll({ offset: 0, limit: 20 })
    expect(Array.isArray(location)).toStrictEqual(true)
    expect(locationRepo.find).toHaveBeenCalled()
    expect(location[0]).toMatchObject(locationMock)
  })

  it('#create', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, ...createLocationDto } = locationMock
    const location = await service.create({
      ...createLocationDto,
      coordinates: createLocationDto.coordinates.coordinates as [number, number],
    })
    expect(locationRepo.create).toHaveBeenCalled()
    expect(location).toMatchObject(locationMock)
  })

  it('#update', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...createLocationDto } = locationMock
    const location = await service.update(id, {
      ...createLocationDto,
      coordinates: createLocationDto.coordinates.coordinates as [number, number],
    })
    expect(locationRepo.update).toHaveBeenCalled()
    expect(location).toMatchObject(locationMock)
  })
})
