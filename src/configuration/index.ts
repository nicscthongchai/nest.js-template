import AppConfig from './app.config'

export default () => ({
  [AppConfig.name]: new AppConfig(),
})
