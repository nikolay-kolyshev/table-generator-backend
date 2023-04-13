import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateTableContainerCommand } from '@/table-containers/command-bus/table-containers.commands';
import { TableContainersCommandRepository } from '@/table-containers/repositories/table-containers.command-repository';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';
import { DeleteTableByIdCommand } from '@/tables/command-bus/table.commands';

@CommandHandler(CreateTableContainerCommand)
class CreateTableContainerCommandHandler
  implements ICommandHandler<CreateTableContainerCommand, TableContainerEntity>
{
  constructor(
    private readonly tableContainersCommandRepository: TableContainersCommandRepository,
  ) {}

  public async execute(
    command: CreateTableContainerCommand,
  ): Promise<TableContainerEntity> {
    try {
      return await this.tableContainersCommandRepository.create(
        command.mainTable,
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при создании контейнера таблиц',
      );
    }
  }
}

@CommandHandler(DeleteTableByIdCommand)
class DeleteTableContainerCommandHandler
  implements ICommandHandler<DeleteTableByIdCommand, void>
{
  constructor(
    private readonly tableContainerRepository: TableContainersCommandRepository,
  ) {}

  public async execute(command: DeleteTableByIdCommand): Promise<void> {
    try {
      await this.tableContainerRepository.deleteById(command.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при удалении контейнера таблиц',
      );
    }
  }
}

export const TableContainersCommandHandlers = {
  CreateTableContainerCommandHandler,
  DeleteTableContainerCommandHandler,
};
