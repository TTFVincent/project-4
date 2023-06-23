import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './JwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // getJWT(authorization: string | undefined) {
  //   if (!authorization) {
  //     throw new UnauthorizedException();
  //   }
  //   if (!authorization.startsWith('Bearer ')) {
  //     throw new BadRequestException();
  //   }
  //   const token = authorization.slice('Bearer '.length);
  //   const payload = this.jwtService.decode(token);
  //   return payload as JwtPayload;
  // }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('password not matched');
    }
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      user_id: user.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    email: string,
    username: string,
    password: string,
  ): Promise<any> {
    try {
      const user = await this.usersService.create({
        email,
        username,
        password,
      });
      const payload = { email: user.email, sub: user.id };
      return {
        user_id: user.id,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch {
      throw new NotFoundException('User already exist');
    }
  }
}
