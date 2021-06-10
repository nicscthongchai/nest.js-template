import { UnauthorizedException } from '@nestjs/common'

export const AuthHeader = (header?: string) => {
  if (!header) throw new UnauthorizedException()

  const [scheme, token] = header.split(' ')

  if (!['basic', 'bearer'].includes(scheme.toLowerCase())) throw new UnauthorizedException()

  return {
    scheme,
    token,
  }
}
