import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Point } from 'geojson'
import { CreateLocationDto, UpdateLocationDto } from './dto'
import { Location } from './entity'
import { FindAllQuery } from './interfaces/find-all.query'

type Coords = [number, number]

@Injectable()
export class LocationService {
  constructor(@InjectRepository(Location) private readonly location: Repository<Location>) {}

  async findOne(id: number) {
    const location = await this.location.findOne({ id })
    return location
  }

  async findAll(query: FindAllQuery) {
    const locations = await this.location.find({ skip: query.offset ?? 0, take: query.limit ?? 20 })
    return locations
  }

  async create(createLocationDto: CreateLocationDto) {
    const { coordinates, ...rest } = createLocationDto
    const point: Point = { type: 'Point', coordinates }
    const location = await this.location.save(this.location.create({ coordinates: point, ...rest }))
    return location
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const { coordinates, ...rest } = updateLocationDto
    const coordinate: Point | Record<any, any> = coordinates
      ? { coordinates: { type: 'Point', coordinates } }
      : {}
    const update = await this.location.update({ id }, { ...coordinate, ...rest })
    return update.affected === 1 ? await this.findOne(id) : null
  }

  async remove(id: number) {
    const deleted = await this.location.delete({ id })
    return deleted.affected === 1
  }

  async calculateDistance([lat1, lon1]: Coords, [lat2, lon2]: Coords) {
    const R = 6371e3 // radius of Earth in metres
    const φ1 = (lat1 * Math.PI) / 180 // latitude_1 in radians
    const φ2 = (lat2 * Math.PI) / 180 // latitude_2 in radians
    const Δφ = ((lat2 - lat1) * Math.PI) / 180 // change in latitudinal angles in radians
    const Δλ = ((lon2 - lon1) * Math.PI) / 180 // change in longitude in radians

    // Calculating distance using Haversine formula
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const d = parseFloat((R * c).toFixed(3)) // in metres

    return { distance: d, unit: 'meter' }
  }
}
