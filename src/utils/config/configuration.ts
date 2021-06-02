export type Configuration = ReturnType<typeof configFactory>

const APP_NAME = 'calebpitan/autochek-assessment'

const configFactory = () => ({
  app: {
    name: APP_NAME,
    port: Number(process.env.PORT) || 5000,
    env: process.env.NODE_ENV || 'development',
    production: process.env.NODE_ENV === 'production',
  },
  database: {
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT) || 5432,
    username: process.env.PG_USER || `postgres`,
    password: process.env.PG_PASSWORD || 'root',
    database: process.env.PG_DATABASE || 'autochek_assessment',
  },
})

export default configFactory
