import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoggerService } from '@/common/logger/logger.service';
import {
  CreateCityFailLogCommand,
  CreateCityLogCommand,
  CreateCitySuccessLogCommand,
  DeleteCityByIdFailLogCommand,
  DeleteCityByIdLogCommand,
  DeleteCityByIdSuccessLogCommand,
} from '@/cities/command-bus/log/cities.log.commands';
import { CITIES_LOGGER_CONTEXT_VALUE } from '@/cities/cities.constants';

@CommandHandler(CreateCityLogCommand)
class CreateCityLogCommandHandler
  implements ICommandHandler<CreateCityLogCommand, void>
{
  constructor(private readonly logger: LoggerService) {}

  public async execute(command: CreateCityLogCommand) {
    this.logger.log(
      `Создан запрос на создание города ${command.dto.name}`,
      CITIES_LOGGER_CONTEXT_VALUE,
    );
  }
}

@CommandHandler(CreateCitySuccessLogCommand)
class CreateCitySuccessLogCommandHandler
  implements ICommandHandler<CreateCitySuccessLogCommand, void>
{
  constructor(private readonly logger: LoggerService) {}

  public async execute(command: CreateCitySuccessLogCommand) {
    this.logger.success(
      `Город ${command.city.name} успешно создан`,
      CITIES_LOGGER_CONTEXT_VALUE,
    );
  }
}

@CommandHandler(CreateCityFailLogCommand)
class CreateCityFailLogCommandHandler
  implements ICommandHandler<CreateCityFailLogCommand, void>
{
  constructor(private readonly logger: LoggerService) {}

  public async execute(command: CreateCityFailLogCommand) {
    this.logger.error(
      `Произошла ошибка при создании города ${command.dto.name}! Подробнее: ${command.error}`,
      '',
      CITIES_LOGGER_CONTEXT_VALUE,
    );
  }
}

@CommandHandler(DeleteCityByIdLogCommand)
class DeleteCityByIdLogCommandHandler
  implements ICommandHandler<DeleteCityByIdLogCommand, void>
{
  constructor(private readonly logger: LoggerService) {}

  public async execute(command: DeleteCityByIdLogCommand) {
    this.logger.log(
      `Создан запрос на удаление города с id ${command.id}`,
      CITIES_LOGGER_CONTEXT_VALUE,
    );
  }
}

@CommandHandler(DeleteCityByIdSuccessLogCommand)
class DeleteCityByIdSuccessLogCommandHandler
  implements ICommandHandler<DeleteCityByIdSuccessLogCommand, void>
{
  constructor(private readonly logger: LoggerService) {}

  public async execute(command: DeleteCityByIdSuccessLogCommand) {
    this.logger.success(
      `Город с id ${command.id} успешно удален`,
      CITIES_LOGGER_CONTEXT_VALUE,
    );
  }
}

@CommandHandler(DeleteCityByIdFailLogCommand)
class DeleteCityByIdFailLogCommandHandler
  implements ICommandHandler<DeleteCityByIdFailLogCommand, void>
{
  constructor(private readonly logger: LoggerService) {}

  public async execute(command: DeleteCityByIdFailLogCommand) {
    this.logger.error(
      `Произошла ошибка при удалении города c id ${command.id}! Подробнее: ${command.error}`,
      '',
      CITIES_LOGGER_CONTEXT_VALUE,
    );
  }
}

export const CitiesCommandLogHandlers = {
  CreateCityLogCommandHandler,
  CreateCitySuccessLogCommandHandler,
  CreateCityFailLogCommandHandler,
  DeleteCityByIdLogCommandHandler,
  DeleteCityByIdFailLogCommandHandler,
};
