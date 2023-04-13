import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateCityCommand,
  DeleteCityByIdCommand,
} from '@/cities/command-bus/cities.commands';
import { InternalServerErrorException } from '@nestjs/common';
import { CitiesCommandRepository } from '@/cities/repositories/citites.command-repository';
import { CityEntity } from '@/cities/entities/city.entity';
import {
  CreateCityEvent,
  CreateCityFailEvent,
  CreateCitySuccessEvent,
  DeleteCityByIdEvent,
  DeleteCityByIdFailEvent,
  DeleteCityByIdSuccessEvent,
} from '@/cities/event-bus/cities.events';

@CommandHandler(CreateCityCommand)
class CreateCityCommandHandler
  implements ICommandHandler<CreateCityCommand, CityEntity>
{
  constructor(
    private readonly citiesCommandRepository: CitiesCommandRepository,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: CreateCityCommand): Promise<CityEntity> {
    try {
      this.eventBus.publish(new CreateCityEvent(command.dto));
      const city = await this.citiesCommandRepository.create(command.dto);
      this.eventBus.publish(new CreateCitySuccessEvent(city));
      return city;
    } catch (err) {
      this.eventBus.publish(new CreateCityFailEvent(command.dto, err));
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при создании города',
      );
    }
  }
}

@CommandHandler(DeleteCityByIdCommand)
class DeleteCityCommandHandler
  implements ICommandHandler<DeleteCityByIdCommand, void>
{
  constructor(
    private readonly citiesCommandRepository: CitiesCommandRepository,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: DeleteCityByIdCommand): Promise<void> {
    try {
      this.eventBus.publish(new DeleteCityByIdEvent(command.id));
      await this.citiesCommandRepository.deleteById(command.id);
      this.eventBus.publish(new DeleteCityByIdSuccessEvent(command.id));
    } catch (err) {
      this.eventBus.publish(new DeleteCityByIdFailEvent(command.id, err));
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при удалении города',
      );
    }
  }
}

export const CitiesCommandHandlers = {
  CreateCityCommandHandler,
  DeleteCityCommandHandler,
};
