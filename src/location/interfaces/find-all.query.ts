import { IsNumberString, IsOptional } from 'class-validator'

export class FindAllQuery {
  @IsNumberString()
  @IsOptional()
  offset?: number

  @IsNumberString()
  @IsOptional()
  limit?: number
}
