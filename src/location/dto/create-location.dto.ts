import { Type } from 'class-transformer'
import { ArrayMaxSize, ArrayMinSize, IsArray, IsMobilePhone, IsUrl, Length } from 'class-validator'

export class CreateLocationDto {
  @Length(3, 128)
  location_name!: string

  @Length(1, 250)
  description!: string

  @IsUrl()
  website!: string

  @IsMobilePhone()
  phone!: string

  @Length(8)
  contact_person!: string

  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @IsArray()
  @Type(() => Number)
  coordinates!: [number, number]
}
