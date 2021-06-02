import { ConnectionOptions } from 'typeorm'

export type TypeormOptionsFactory = (partial: {
  username: string
  password: string
  port: number
  database: string
}) => ConnectionOptions

export const typeormDefaultOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
}

export const getTypeormOptions: TypeormOptionsFactory = variables => ({
  type: 'postgres',
  synchronize: true,
  logging: false,
  ...variables,
})
