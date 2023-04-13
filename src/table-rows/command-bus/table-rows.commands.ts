import { ICommand } from '@nestjs/cqrs';
import { CreateTableRowDto } from '@/table-rows/dto/create-table-row.dto';
import { UpdateTableRowDto } from '@/table-rows/dto/update-table-row.dto';

export class CreateTableRowCommand implements ICommand {
  constructor(public readonly dto: CreateTableRowDto) {}
}

export class UpdateTableRowCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly dto: UpdateTableRowDto,
  ) {}
}

export class DeleteTableRowByIdCommand implements ICommand {
  constructor(public readonly id: number) {}
}

export const TableRowsCommands = {
  CreateTableRowCommand,
  DeleteTableRowByIdCommand,
};
