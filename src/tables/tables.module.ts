import { Module } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { mapDependencyObjectsToModuleProviders } from '@/common/helpers/map-dependency-objects-to-module.providers.helper';
import { TableQueries } from '@/tables/query-bus/table.queries';
import { TableQueriesHandlers } from '@/tables/query-bus/table.queries-handlers';
import { TableCommands } from '@/tables/command-bus/table.commands';
import { TableCommandHandlers } from '@/tables/command-bus/table.command-handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablesQueryRepository } from '@/tables/repositories/tables.query-repository';
import { TablesCommandRepository } from '@/tables/repositories/tables-command-repository.service';
import { TableEntity } from '@/tables/entities/table.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TableEntity])],
  controllers: [TablesController],
  providers: [
    TablesService,
    TablesQueryRepository,
    TablesCommandRepository,
    ...mapDependencyObjectsToModuleProviders([
      TableQueries,
      TableQueriesHandlers,
      TableCommands,
      TableCommandHandlers,
    ]),
  ],
  exports: [TablesCommandRepository],
})
export class TablesModule {}
