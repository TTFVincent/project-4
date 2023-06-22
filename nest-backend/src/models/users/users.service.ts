import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create({
      name: createUserDto.username,
      role: 'user',
      password: await bcrypt.hash(createUserDto.password, 10),
      email: createUserDto.email,
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findAllUsers(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: ['id', 'name'],
      where: {
        role: 'user',
      },
    });
  }

  findOneById(id: number): Promise<User> {
    return this.userModel.findOne({
      attributes: ['id', 'name'],
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      attributes: ['id', 'name', 'password', 'email'],
      where: {
        email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOneById(id);
    await user.destroy();
  }
}
