import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InternalServerErrorException } from '@nestjs/common';
import {
  GetAllSideTablesByTableContainerIdQuery,
  GetMainTableByTableContainerIdQuery,
  GetTableByIdQuery,
} from '@/tables/query-bus/table.queries';
import { TableEntity } from '@/tables/entities/table.entity';
import { TablesQueryRepository } from '@/tables/repositories/tables.query-repository';

@QueryHandler(GetAllSideTablesByTableContainerIdQuery)
class GetAllSideTablesByTableContainerIdQueryHandler
  implements
    IQueryHandler<GetAllSideTablesByTableContainerIdQuery, TableEntity[]>
{
  constructor(private readonly tablesQueryRepository: TablesQueryRepository) {}

  public async execute(
    query: GetAllSideTablesByTableContainerIdQuery,
  ): Promise<TableEntity[]> {
    try {
      return await this.tablesQueryRepository.getAllSideTablesByTableContainerId(
        query.tableContainerId,
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске таблиц',
      );
    }
  }
}

@QueryHandler(GetMainTableByTableContainerIdQuery)
class GetMainTableByTableContainerIdQueryHandler
  implements IQueryHandler<GetMainTableByTableContainerIdQuery, TableEntity>
{
  constructor(private readonly tablesQueryRepository: TablesQueryRepository) {}

  public async execute(
    query: GetMainTableByTableContainerIdQuery,
  ): Promise<TableEntity> {
    try {
      return await this.tablesQueryRepository.getMainTableByTableContainerId(
        query.tableContainerId,
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске таблицы',
      );
    }
  }
}

@QueryHandler(GetTableByIdQuery)
class GetTableByIdQueryHandler
  implements IQueryHandler<GetTableByIdQuery, TableEntity>
{
  constructor(private readonly tableQueryRepository: TablesQueryRepository) {}

  public async execute(query: GetTableByIdQuery): Promise<TableEntity> {
    try {
      return await this.tableQueryRepository.findById(query.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске таблицы',
      );
    }
  }
}

export const TableQueriesHandlers = {
  GetAllSideTablesByTableContainerIdQueryHandler,
  GetMainTableByTableContainerIdQueryHandler,
  GetTableByIdQueryHandler,
};
