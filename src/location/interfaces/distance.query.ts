import { Transform } from 'class-transformer'
import { IsArray } from 'class-validator'

const isString = (v: any): v is string => typeof v === 'string'

export class DistanceQuery {
  @IsArray()
  @Transform(({ value }) => {
    return isString(value) ? (value as string).split(',', 2).map(v => parseFloat(v)) : value
  })
  loc_1!: [number, number]

  @IsArray()
  @Transform(({ value }) => {
    return isString(value) ? (value as string).split(',', 2).map(v => parseFloat(v)) : value
  })
  loc_2!: [number, number]
}
