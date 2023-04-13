import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from '@/tables/dto/create-table.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetAllSideTablesByTableContainerIdQuery,
  GetMainTableByTableContainerIdQuery,
  GetTableByIdQuery,
} from '@/tables/query-bus/table.queries';
import {
  CreateTableCommand,
  DeleteTableByIdCommand,
} from '@/tables/command-bus/table.commands';
import {
  GetTableRowByIdQuery,
  GetTableRowsByIdsAndTableId,
} from '@/table-rows/query-bus/table-rows.queries';
import { TableEntity } from '@/tables/entities/table.entity';

@Injectable()
export class TablesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getAllSideTablesByTableContainerId(tableContainerId: number) {
    return await this.queryBus.execute(
      new GetAllSideTablesByTableContainerIdQuery(tableContainerId),
    );
  }

  async getMainTableByTableContainerId(tableContainerId: number) {
    return await this.queryBus.execute(
      new GetMainTableByTableContainerIdQuery(tableContainerId),
    );
  }

  async getTableById(id: number) {
    return await this.queryBus.execute(new GetTableByIdQuery(id));
  }

  async createTable(dto: CreateTableDto) {
    if (dto.copiedTableId && dto.rowsIds) {
      const { rowsIds, copiedTableId, ...restDto } = dto;
      const rowsCandidate = await this.queryBus.execute(
        new GetTableRowsByIdsAndTableId(rowsIds, copiedTableId),
      );
      if (rowsCandidate) {
        return await this.commandBus.execute(
          new CreateTableCommand({ ...restDto, rows: rowsCandidate }),
        );
      }
    }
    return await this.commandBus.execute(new CreateTableCommand(dto));
  }

  async deleteTableById(id: number) {
    const tableCandidate = await this.queryBus.execute<
      GetTableRowByIdQuery,
      TableEntity
    >(new GetTableRowByIdQuery(id));
    if (tableCandidate && tableCandidate.isMain) {
      throw new BadRequestException(
        'Нельзя удалить главную таблицу в контейнере!',
      );
    }
    return await this.commandBus.execute(new DeleteTableByIdCommand(id));
  }
}
