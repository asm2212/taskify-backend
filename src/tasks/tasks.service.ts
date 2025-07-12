import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskStatus } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/schemas/user.schema';
import { TaskQueryDto } from './dto/task-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskModel.create({
      ...createTaskDto,
      user: user._id,
    });
  }

  async findAll(
    query: TaskQueryDto,
    user: User,
  ): Promise<{ tasks: Task[]; count: number }> {
    const { search, status, limit = 10, offset = 0 } = query;

    const filter: any = { user: user._id };
    if (status) filter.status = status;
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const [tasks, count] = await Promise.all([
      this.taskModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.taskModel.countDocuments(filter),
    ]);

    return { tasks, count };
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    // validate status transition
    if (updateTaskDto.status) {
      const currentTask = await this.taskModel.findById(id);

      if (!currentTask) {
        throw new NotFoundException('Task not found');
      }

      if (currentTask.status === TaskStatus.COMPLETED) {
        throw new BadRequestException('Cannot modify completed tasks');
      }
    }

    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, user: user._id },
      updateTaskDto,
      { new: true, runValidators: true },
    );

    if (!task) {
      throw new NotFoundException('Task not found or unauthorized');
    }

    return task;
  }

  async remove(id: string, user: User): Promise<void> {
    const result = await this.taskModel.deleteOne({
      _id: id,
      user: user._id,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Task not found or unauthorized');
    }
  }

  async getDashboardStats(user: User) {
    const stats = await this.taskModel.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      pending: stats.find((s) => s.id == TaskStatus.PENDING)?.count || 0,
      inProgress:stats.find((s) => s._id === TaskStatus.IN_PROGRESS)?.count || 0,
      completed: stats.find((s) => s._id === TaskStatus.COMPLETED)?.count || 0,
    };
  }
}
