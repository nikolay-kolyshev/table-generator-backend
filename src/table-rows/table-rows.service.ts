import { Injectable } from '@nestjs/common';
import { CreateTableRowDto } from '@/table-rows/dto/create-table-row.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateTableRowDto } from '@/table-rows/dto/update-table-row.dto';
import {
  GetAllTableRowsByTableIdQuery,
  GetTableRowByIdQuery,
} from '@/table-rows/query-bus/table-rows.queries';
import { PageOptionsDto } from '@/common/pagination/dto/page-options.dto';
import {
  CreateTableRowCommand,
  UpdateTableRowCommand,
} from '@/table-rows/command-bus/table-rows.commands';
import { DeleteTableByIdCommand } from '@/tables/command-bus/table.commands';

@Injectable()
export class TableRowsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  getAllTableRowsByTableId(tableId: number, pageOptionsDto: PageOptionsDto) {
    return this.queryBus.execute(
      new GetAllTableRowsByTableIdQuery(tableId, pageOptionsDto),
    );
  }

  getTableRowsById(id: number) {
    return this.queryBus.execute(new GetTableRowByIdQuery(id));
  }

  createTableRow(dto: CreateTableRowDto) {
    return this.commandBus.execute(new CreateTableRowCommand(dto));
  }

  updateTableRow(id: number, dto: UpdateTableRowDto) {
    return this.commandBus.execute(new UpdateTableRowCommand(id, dto));
  }

  async deleteTableRowById(id: number) {
    return this.commandBus.execute(new DeleteTableByIdCommand(id));
  }
}
