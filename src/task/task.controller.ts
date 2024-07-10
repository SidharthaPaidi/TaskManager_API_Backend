import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Body } from '@nestjs/common';
import { Req } from '@nestjs/common';

@Controller('task')

export class TaskController {
    constructor( private  taskService : TaskService) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    async create(@Body('name') taskName: string, @Req() req) {
      return await this.taskService.createTask(taskName, req.user);
    }

}
