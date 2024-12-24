import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './tasks.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getTasks(userId: string) {
    return this.taskModel.find({ userId });
  }

  async addTask(userId: string, name: string) {
    const task = new this.taskModel({ userId, name });
    return task.save();
  }
}
