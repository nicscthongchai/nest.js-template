import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { hashSync } from 'bcrypt'
import { Model } from 'mongoose'
import { AuthConfig } from 'src/configuration'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async findByUsername(username: string) {
    return await this.userModel.findOne({
      username: new RegExp(`${username}`, 'i'),
    })
  }

  async create(dto: CreateUserDto) {
    const exist = await this.findByUsername(dto.username)
    if (exist) {
      throw new BadRequestException('username already taken')
    }
    const { saltRound } = this.configService.get<AuthConfig>(AuthConfig.name)
    dto.username = dto.username.toLowerCase()
    dto.password = hashSync(dto.password, saltRound)
    const user = new this.userModel(dto)
    await user.save()
    return
  }
}
