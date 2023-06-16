import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() data: any){
    console.log(data)
      console.log("fail")
    
    return {message: 'Data received!'};
  }

  @Get()
  getHello(): string {
    console.log("here")

    return this.appService.getHello();
  }
  
  
}

