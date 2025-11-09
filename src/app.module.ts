import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // โหลด .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://localhost:27017'),
        dbName: config.get<string>('DB_NAME', 'nakorncode'),
      }),
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]), // Register Cat schema
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
