import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsMobilePhone,
  IsOptional,
  Length,
} from 'class-validator'

export class UpdateLocationDto {
  @Length(3, 128)
  @IsOptional()
  location_name?: string

  @Length(1, 250)
  @IsOptional()
  description?: string

  @Length(1, 32)
  @IsOptional()
  website?: string

  @IsMobilePhone()
  @IsOptional()
  phone?: string

  @Length(8)
  @IsOptional()
  contact_person?: string

  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @IsArray()
  @IsOptional()
  @Type(() => Number)
  coordinates?: [number, number]
}
