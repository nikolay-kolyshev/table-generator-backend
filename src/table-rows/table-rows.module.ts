import { Module } from '@nestjs/common';
import { TableRowsController } from './table-rows.controller';
import { TableRowsService } from './table-rows.service';
import { mapDependencyObjectsToModuleProviders } from '@/common/helpers/map-dependency-objects-to-module.providers.helper';
import { TableRowsCommands } from '@/table-rows/command-bus/table-rows.commands';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableRowEntity } from '@/table-rows/entities/table-row.entity';
import { TableRowsCommandHandlers } from '@/table-rows/command-bus/table-rows.command-handlers';
import { TableRowsQueries } from '@/table-rows/query-bus/table-rows.queries';
import { TableRowsQueriesHandlers } from '@/table-rows/query-bus/table-rows.queries-handlers';
import { TableRowsQueryRepository } from '@/table-rows/repositories/table-rows.query-repository';
import { TableRowsCommandRepository } from '@/table-rows/repositories/table-rows.command-repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TableRowEntity])],
  controllers: [TableRowsController],
  providers: [
    TableRowsService,
    TableRowsQueryRepository,
    TableRowsCommandRepository,
    ...mapDependencyObjectsToModuleProviders([
      TableRowsCommands,
      TableRowsCommandHandlers,
      TableRowsQueries,
      TableRowsQueriesHandlers,
    ]),
  ],
})
export class TableRowsModule {}
