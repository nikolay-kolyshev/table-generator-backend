import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InternalServerErrorException } from '@nestjs/common';
import {
  CreateTableRowCommand,
  DeleteTableRowByIdCommand,
  UpdateTableRowCommand,
} from '@/table-rows/command-bus/table-rows.commands';
import { TableRowsCommandRepository } from '@/table-rows/repositories/table-rows.command-repository';
import { TableRowEntity } from '@/table-rows/entities/table-row.entity';
import { UpdateResult } from 'typeorm';

@CommandHandler(CreateTableRowCommand)
class CreateTableRowCommandHandler
  implements ICommandHandler<CreateTableRowCommand, TableRowEntity>
{
  constructor(
    private readonly tableRowsCommandRepository: TableRowsCommandRepository,
  ) {}

  public async execute(
    command: CreateTableRowCommand,
  ): Promise<TableRowEntity> {
    try {
      return await this.tableRowsCommandRepository.create(command.dto);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при создании строки таблицы',
      );
    }
  }
}

@CommandHandler(UpdateTableRowCommand)
class UpdateTableRowCommandHandler
  implements ICommandHandler<UpdateTableRowCommand, UpdateResult>
{
  constructor(
    private readonly tableRowsCommandRepository: TableRowsCommandRepository,
  ) {}

  public async execute(command: UpdateTableRowCommand): Promise<UpdateResult> {
    try {
      return await this.tableRowsCommandRepository.updateById(
        command.id,
        command.dto,
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при создании строки таблицы',
      );
    }
  }
}

@CommandHandler(DeleteTableRowByIdCommand)
class DeleteTableRowCommandHandler
  implements ICommandHandler<DeleteTableRowByIdCommand, void>
{
  constructor(
    private readonly tableRowsCommandRepository: TableRowsCommandRepository,
  ) {}

  public async execute(command: DeleteTableRowByIdCommand): Promise<void> {
    try {
      await this.tableRowsCommandRepository.deleteById(command.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при удалении строки таблицы',
      );
    }
  }
}

export const TableRowsCommandHandlers = {
  CreateTableRowCommandHandler,
  DeleteTableRowCommandHandler,
};
