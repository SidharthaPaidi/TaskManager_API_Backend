import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { CreateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) // Injecting the Task model into the taskService
        private taskModel: Model<Task> // defining the class property taskModel as an instance of the Task model
    ) { }

    // createTask method to create a new task
    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = new this.taskModel(createTaskDto);
        console.log(newTask);
        return newTask.save();
    }

    // getTasks method to get all the tasks
    async getTasks(@Req() req) {
        const tasks = await this.taskModel.find({user: req.user._id});
        return tasks;
    }

    // Add this method
    async updateTaskById(taskId: string, updatePayload: any): Promise<any> {
        const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, updatePayload, { new: true });
        updatedTask.completed = true;
        console.log(updatedTask);
        return updatedTask;
    }



}
