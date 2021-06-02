import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseInterceptors,
} from '@nestjs/common'
import { LocationService } from './location.service'
import { CreateLocationDto, UpdateLocationDto } from './dto'
import { FindOneParam, FindAllQuery, DistanceQuery } from './interfaces'
import { DataInterceptor } from '../data.interceptor'

@Controller('location')
@UseInterceptors(DataInterceptor)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('distance')
  async calculateDistance(@Query() { loc_1, loc_2 }: DistanceQuery) {
    const distance = await this.locationService.calculateDistance(loc_1, loc_2)
    return { location: distance }
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParam) {
    const location = await this.locationService.findOne(id)
    return { location }
  }

  @Get()
  async findAll(@Query() query: FindAllQuery) {
    const location = await this.locationService.findAll(query)
    return { location }
  }

  @Post()
  async create(@Body() createAccountDto: CreateLocationDto) {
    const location = await this.locationService.create(createAccountDto)
    return { location, success: true, message: 'Location created successfully!' }
  }

  @Put(':id')
  async update(@Param() { id }: FindOneParam, @Body() updateLocationDto: UpdateLocationDto) {
    const location = await this.locationService.update(id, updateLocationDto)
    return { location, success: true, message: 'Location updated successfully!' }
  }

  @Delete(':id')
  async remove(@Param() { id }: FindOneParam) {
    const deleted = await this.locationService.remove(id)
    return { id, message: 'Location deleted successfully', success: deleted }
  }
}
