import { Controller, Post, UseGuards, Patch, Body, Param, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from './task.dto';


@Controller('task')

export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
        const userId = req.user._id; // Get user ID from request
        return this.taskService.create({ ...createTaskDto, user: userId });
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
