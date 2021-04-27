import { IsString, Length, Matches } from 'class-validator'
import { PasswordRegex, UsernameRegex } from 'src/constant'

export class CreateUserDto {
  @IsString()
  @Length(4, 32)
  @Matches(UsernameRegex, {
    message: 'accept only a-z, 0-9, . (dot) and _ (underscore)',
  })
  username: string

  @IsString()
  @Length(8, 64)
  @Matches(PasswordRegex, {
    message: 'password must be stronger',
  })
  password: string
}
