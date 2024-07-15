import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) // Injecting the Task model into the taskService
        private taskModel: Model<Task> // defining the class property taskModel as an instance of the Task model
    ) { }

    // createTask method to create a new task
    async createTask(name: string, user: User) {
        const newTask = new this.taskModel({ name: name, user: user._id, completed: false });
        const result = await newTask.save();
        console.log(result);
        return result;
    }

    // getTasks method to get all the tasks
    async getTasks() {
        const tasks = await this.taskModel.find();
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
