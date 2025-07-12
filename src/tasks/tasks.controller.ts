import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { TaskQueryDto } from './dto/task-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks with filtering' })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully',
    schema: {
      example: {
        tasks: [
          {
            _id: '65a7b...',
            name: 'Task 1',
            status: 'in-progress',
            user: '65a7a...',
            createdAt: '2025-01-18T12:00:00.000Z',
            updatedAt: '2025-01-18T12:00:00.000Z',
          },
        ],
        count: 1,
      },
    },
  })
  findAll(@Query() query: TaskQueryDto, @GetUser() user: User) {
    return this.tasksService.findAll(query, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.remove(id, user);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get task statistics for dashboard' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard stats retrieved',
    schema: {
      example: {
        pending: 5,
        inProgress: 3,
        completed: 10,
      },
    },
  })
  getDashboardStats(@GetUser() user: User) {
    return this.tasksService.getDashboardStats(user);
  }
}
