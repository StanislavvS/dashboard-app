import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    RegisterModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PWD}@cluster0.fwxripz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority/`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
