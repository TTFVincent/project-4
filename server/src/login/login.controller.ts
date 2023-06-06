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
  create(@Body() data: any){
    console.log(data)
    for(let user of users){
      
      if(user.password==data.password && user.email==data.email){
        console.log("success")
        const payload = {id: user.id}
        const token = jwtEncode(payload,process.env.JWT_SECRET)
        console.log(token)

        return {token: token}
      }
      console.log("fail")
    }
    return {message: 'Data received!'};
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

}
