import { Module } from '@nestjs/common';
import { TableContainersController } from './table-containers.controller';
import { TableContainersService } from './table-containers.service';
import { mapDependencyObjectsToModuleProviders } from '@/common/helpers/map-dependency-objects-to-module.providers.helper';
import { TableContainersQueries } from '@/table-containers/query-bus/table-containers.queries';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';
import { TableContainersQueriesHandlers } from '@/table-containers/query-bus/table-containers.queries-handlers';
import { TableContainersCommands } from '@/table-containers/command-bus/table-containers.commands';
import { TableContainersCommandHandlers } from '@/table-containers/command-bus/table-containers.command-handlers';
import { TableContainersQueryRepository } from '@/table-containers/repositories/table-containers.query-repository';
import { TableContainersCommandRepository } from '@/table-containers/repositories/table-containers.command-repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TableContainerEntity])],
  controllers: [TableContainersController],
  providers: [
    TableContainersService,
    TableContainersQueryRepository,
    TableContainersCommandRepository,
    ...mapDependencyObjectsToModuleProviders([
      TableContainersQueries,
      TableContainersQueriesHandlers,
      TableContainersCommands,
      TableContainersCommandHandlers,
    ]),
  ],
})
export class TableContainersModule {}
