import { AuthIdentity } from './auth-identity'

export interface AuthPrincipal extends AuthIdentity {
  isAuthenticated: boolean
}
