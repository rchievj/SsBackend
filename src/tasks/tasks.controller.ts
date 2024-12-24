import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Req() req) {
    return this.tasksService.getTasks(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addTask(@Body('name') name: string, @Req() req) {
    return this.tasksService.addTask(req.user.userId, name);
  }
}
