import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InternalServerErrorException } from '@nestjs/common';
import { TablesCommandRepository } from '@/tables/repositories/tables-command-repository.service';
import {
  CreateTableCommand,
  DeleteTableByIdCommand,
} from '@/tables/command-bus/table.commands';
import { TableEntity } from '@/tables/entities/table.entity';

@CommandHandler(CreateTableCommand)
class CreateTableCommandHandler
  implements ICommandHandler<CreateTableCommand, TableEntity>
{
  constructor(
    private readonly tableCommandRepository: TablesCommandRepository,
  ) {}

  public async execute(command: CreateTableCommand): Promise<TableEntity> {
    try {
      return await this.tableCommandRepository.create(command.dto);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при создании таблицы',
      );
    }
  }
}

@CommandHandler(DeleteTableByIdCommand)
class DeleteTableByIdCommandHandler
  implements ICommandHandler<DeleteTableByIdCommand, void>
{
  constructor(
    private readonly tableCommandRepository: TablesCommandRepository,
  ) {}

  public async execute(command: DeleteTableByIdCommand): Promise<void> {
    try {
      await this.tableCommandRepository.deleteById(command.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при удалении таблицы',
      );
    }
  }
}

export const TableCommandHandlers = {
  CreateTableCommandHandler,
  DeleteTableByIdCommandHandler,
};
