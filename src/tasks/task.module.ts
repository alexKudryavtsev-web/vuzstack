import { LogicModule } from '@app/api/logic/logic.module';
import { Module } from '@nestjs/common';
import { TaskService } from '@app/tasks/task.service';

@Module({
  imports: [LogicModule],
  providers: [TaskService],
})
export class TaskModule {}
