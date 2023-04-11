import { Module } from '@nestjs/common';
import { TableContainersController } from './table-containers.controller';
import { TableContainersService } from './table-containers.service';

@Module({
  controllers: [TableContainersController],
  providers: [TableContainersService],
})
export class TableContainersModule {}
