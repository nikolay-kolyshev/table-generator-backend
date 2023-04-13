import { ICommand } from '@nestjs/cqrs';
import { TableEntity } from '@/tables/entities/table.entity';

export class CreateTableContainerCommand implements ICommand {
  constructor(public readonly mainTable: TableEntity) {}
}

export class DeleteTableContainerByIdCommand implements ICommand {
  constructor(public readonly id: number) {}
}

export const TableContainersCommands = {
  CreateTableContainerCommand,
  DeleteTableContainerByIdCommand,
};
