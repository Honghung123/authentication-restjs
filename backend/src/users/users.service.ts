import {
  BadRequestException,
  Delete,
  Get,
  Injectable,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { encryptPassword } from 'src/utilities/bcrypt.ultility';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'users') private userModel: Model<User>,
    @InjectConnection('users') private readonly connection: Connection,
  ) {}

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    // Your transaction logic here
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isEmailExists = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (isEmailExists) {
      throw new BadRequestException('Email already exists');
    }
    const isUsernameExists = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();
    if (isUsernameExists) {
      throw new BadRequestException('Username already exists');
    }
    const hashPassword = await encryptPassword(createUserDto.password);
    const createUser = new this.userModel({
      ...createUserDto,
      password: hashPassword,
    });
    return createUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ username }, updateUserDto, { new: true })
      .exec();
  }

  async remove(email: string): Promise<any> {
    return this.userModel.deleteOne({ email }).exec();
  }
}
