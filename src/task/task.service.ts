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
    async createTask(title: string, user: User) {
        const newTask = new this.taskModel({ title: title, user: user._id, status: false });
        const result = await newTask.save();
        console.log(result);
        return result;
    }

    // getTasks method to get all the tasks
    async getTasks() {
        const tasks = await this.taskModel.find();
        return tasks;
    }

    // getTaskById method to get a task by its id
    async getTaskById(id: string) {
        const task = await this.taskModel.findById(id);
        return task;
    }

    // updateTask method to update a task by its id
    async updateTask(id: string, title: string, status: boolean) {
        const task = await this.taskModel.findById(id);
        task.title = title;
        task.status = status;
        const result = await task.save();
        return result;
    }

    // deleteTask method to delete a task by its id
    async deleteTask(id: string) {
        const result = await this.taskModel.deleteOne({
            _id:
                id
        });
    }

}
