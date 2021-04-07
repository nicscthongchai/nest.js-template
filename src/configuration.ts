export type AppConfig = {
  env: 'development' | 'test' | 'staging' | 'production'
  port: number
  enableIndexPage: boolean
}

export type Config = {
  app: AppConfig
}

export default (): Config => ({
  app: {
    env: (process.env.NODE_ENV as Config['app']['env']) || 'development',
    port: parseInt(process.env.PORT || '3000'),
    enableIndexPage: true,
  },
})
