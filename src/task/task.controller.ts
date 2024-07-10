import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Body } from '@nestjs/common';
import { Req } from '@nestjs/common';

@Controller('task')

export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    async create(@Body('name') taskName: string, @Req() req) {
        return await this.taskService.createTask(taskName, req.user);
    }

    @Post('/get')
    @UseGuards(JwtAuthGuard)
    async get(@Req() req) {
        return await this.taskService.getTasks();
    }

    @Post('/getById')
    @UseGuards(JwtAuthGuard)
    async getById(@Body('id') taskId: string) {
        return await this.taskService.getTaskById(taskId);
    }

    @Post('/update')
    @UseGuards(JwtAuthGuard)
    async update(@Body('id') taskId: string, @Body('name') taskName: string, @Body('status') taskStatus: boolean) {
        return await this.taskService.updateTask(taskId, taskName, taskStatus);
    }

    @Post('/delete')
    @UseGuards(JwtAuthGuard)
    async delete(@Body('id') taskId: string) {
        return await this.taskService.deleteTask(taskId);
    }

}
