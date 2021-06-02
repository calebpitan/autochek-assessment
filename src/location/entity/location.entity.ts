import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm'
import { Point } from 'geojson'

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  location_name!: string

  @Column()
  description!: string

  @Column()
  website!: string

  @Column()
  phone!: string

  @Column()
  contact_person!: string

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  coordinates?: Point
}
