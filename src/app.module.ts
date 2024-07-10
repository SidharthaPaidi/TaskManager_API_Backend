import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/auth.guard';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
