import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InternalServerErrorException } from '@nestjs/common';
import {
  GetAllTableContainersPreviewQuery,
  GetTableContainerByIdQuery,
} from '@/table-containers/query-bus/table-containers.queries';
import { TableContainerView } from '@/table-containers/views/table-container.view';
import { TableContainersQueryRepository } from '@/table-containers/repositories/table-containers.query-repository';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';

@QueryHandler(GetAllTableContainersPreviewQuery)
class GetAllTableContainersPreviewQueryHandler
  implements
    IQueryHandler<GetAllTableContainersPreviewQuery, TableContainerView[]>
{
  constructor(
    private readonly tableContainersQueryRepository: TableContainersQueryRepository,
  ) {}

  public async execute(): Promise<TableContainerView[]> {
    try {
      return await this.tableContainersQueryRepository.getAllPreview();
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске контейнеров таблиц',
      );
    }
  }
}
@QueryHandler(GetTableContainerByIdQuery)
class GetTableContainerByIdQueryHandler
  implements IQueryHandler<GetTableContainerByIdQuery, TableContainerEntity>
{
  constructor(
    private readonly tableContainersQueryRepository: TableContainersQueryRepository,
  ) {}

  public async execute(
    query: GetTableContainerByIdQuery,
  ): Promise<TableContainerEntity> {
    try {
      return await this.tableContainersQueryRepository.getById(query.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске контейнера таблиц',
      );
    }
  }
}

export const TableContainersQueriesHandlers = {
  GetAllTableContainersPreviewQueryHandler,
  GetTableContainerByIdQueryHandler,
};
