import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { jwtEncode } from 'src/jwt';
// import { env } from '../env'

type User = {
  id: String
  email: String
  password: String
}

let users: User[] = [] 

users = [{id: "3", email: "sdo@gmail.com", password: "1234"}]

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async create(@Body() data: any){
    console.log(data)
  };
    


  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

}
