import { ICommand } from '@nestjs/cqrs';
import { CopyTableDto } from '@/table-containers/dto/copy-table.dto';

export class CreateTableContainerCommand implements ICommand {}
export class CopyTableCommand implements ICommand {
  constructor(public readonly dto: CopyTableDto) {}
}

export class DeleteTableContainerByIdCommand implements ICommand {
  constructor(public readonly id: number) {}
}

export const TableContainersCommands = {
  CreateTableContainerCommand,
  CopyTableCommand,
  DeleteTableContainerByIdCommand,
};
