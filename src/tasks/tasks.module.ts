import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './tasks.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, JwtAuthGuard, JwtStrategy],
})
export class TasksModule {}