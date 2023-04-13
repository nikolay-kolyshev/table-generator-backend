import { CreateCityDto } from '@/cities/dto/create-city.dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateCityCommand implements ICommand {
  constructor(public readonly dto: CreateCityDto) {}
}

export class DeleteCityByIdCommand implements ICommand {
  constructor(public readonly id: number) {}
}

export const CitiesCommands = {
  CreateCityCommand,
  DeleteCityByIdCommand,
};
