import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InternalServerErrorException } from '@nestjs/common';
import { TableRowEntity } from '@/table-rows/entities/table-row.entity';
import {
  GetAllTableRowsByTableIdQuery,
  GetTableRowByIdQuery,
  GetTableRowsByIdsAndTableId,
} from '@/table-rows/query-bus/table-rows.queries';
import { TableRowsQueryRepository } from '@/table-rows/repositories/table-rows.query-repository';
import { PageDto } from '@/common/pagination/dto/page.dto';

@QueryHandler(GetAllTableRowsByTableIdQuery)
class GetAllTableRowsQueryByTableIdHandler
  implements
    IQueryHandler<GetAllTableRowsByTableIdQuery, PageDto<TableRowEntity>>
{
  constructor(
    private readonly tableRowsQueryRepository: TableRowsQueryRepository,
  ) {}

  public async execute(
    query: GetAllTableRowsByTableIdQuery,
  ): Promise<PageDto<TableRowEntity>> {
    try {
      return await this.tableRowsQueryRepository.findAll(query.dto);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске строк таблицы',
      );
    }
  }
}

@QueryHandler(GetTableRowByIdQuery)
class GetTableRowByIdQueryHandler
  implements IQueryHandler<GetTableRowByIdQuery, TableRowEntity>
{
  constructor(
    private readonly tableRowsQueryRepository: TableRowsQueryRepository,
  ) {}

  public async execute(query: GetTableRowByIdQuery): Promise<TableRowEntity> {
    try {
      return await this.tableRowsQueryRepository.findById(query.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске строки таблицы',
      );
    }
  }
}

@QueryHandler(GetTableRowsByIdsAndTableId)
class GetTableRowsByIdsAndTableIdQueryHandler
  implements IQueryHandler<GetTableRowsByIdsAndTableId, TableRowEntity[]>
{
  constructor(
    private readonly tableRowsQueryRepository: TableRowsQueryRepository,
  ) {}

  public async execute(
    query: GetTableRowsByIdsAndTableId,
  ): Promise<TableRowEntity[]> {
    try {
      return await this.tableRowsQueryRepository.findAllByIds(
        query.ids,
        query.tableId,
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске строки таблицы',
      );
    }
  }
}

export const TableRowsQueriesHandlers = {
  GetAllTableRowsQueryByTableIdHandler,
  GetTableRowByIdQueryHandler,
  GetTableRowsByIdsAndTableIdQueryHandler,
};
