import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LocationModule } from './location/location.module'
import { LoggerModule } from './utils/logger/logger.module'
import configuration from './utils/config/configuration'
import { getTypeormOptions } from './utils/typeorm/options'
import { Configuration } from './utils/config/configuration'

const TypeOrmDynamicModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  async useFactory(configService: ConfigService) {
    return {
      autoLoadEntities: true,
      ...getTypeormOptions({
        ...configService.get<Configuration['database']>('database')!,
      }),
    }
  },
})

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmDynamicModule,
    LoggerModule,
    LocationModule,
  ],
})
export class AppModule {}
