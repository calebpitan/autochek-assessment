import { ConfigModule } from '@nestjs/config'
import configFactory, { Configuration } from './configuration'

const config = configFactory()

export const testConfig: Configuration = { ...config }

export const ConfigDynamicModule = ConfigModule.forRoot({ load: [() => testConfig] })
