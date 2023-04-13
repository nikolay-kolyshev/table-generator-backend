import { ICommand } from '@nestjs/cqrs';
import { CreateTableCommandDto } from '@/tables/dto/create-table-command.dto';

export class CreateTableCommand implements ICommand {
  constructor(public readonly dto: CreateTableCommandDto) {}
}

export class DeleteTableByIdCommand implements ICommand {
  constructor(public readonly id: number) {}
}

export const TableCommands = {
  CreateTableCommand,
  DeleteTableByIdCommand,
};
