import { Controller, Post, UseGuards, Patch, Body, Param, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';


@Controller('task')

export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body('name') taskName: string, @Req() req) {
        return await this.taskService.createTask(taskName, req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    async get(@Req() req) {
        return await this.taskService.getTasks();
    }
    
    @Patch('/:taskId')
    @UseGuards(JwtAuthGuard)
    async updateTaskById(@Param('taskId') taskId: string, @Body() updatePayload: any) {
        return await this.taskService.updateTaskById(taskId, updatePayload);
    }



}
