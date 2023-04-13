import { Injectable } from '@nestjs/common';
import { TableContainerView } from '@/table-containers/views/table-container.view';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetAllTableContainersPreviewQuery,
  GetTableContainerByIdQuery,
} from '@/table-containers/query-bus/table-containers.queries';

@Injectable()
export class TableContainersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getAllTableContainersPreview(): Promise<TableContainerView[]> {
    return await this.queryBus.execute(new GetAllTableContainersPreviewQuery());
  }

  async getTableContainerById(id): Promise<TableContainerEntity> {
    return await this.queryBus.execute(new GetTableContainerByIdQuery(id));
  }

  async createTableContainer() {}

  async deleteTableContainerById(id: number) {}
}
