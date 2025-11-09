import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Cat, CatDocument } from './cat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Cat.name) private catModel: Model<CatDocument>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':name')
  hello(@Param('name') name: string): string {
    return this.appService.hello(name);
  }

  @Post('create-cat')
  async createCat(@Body() catData: Cat): Promise<Cat> {
    console.log('catData', catData);
    const newCat = new this.catModel({
      name: 'Whiskers',
      age: 2,
      breed: 'Tabby',
    });
    return newCat.save();
  }
}
