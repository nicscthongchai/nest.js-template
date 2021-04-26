import { IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @Length(4, 32)
  username: string

  @IsString()
  @Length(8, 64)
  password: string
}
