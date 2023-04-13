import { CreateCityDto } from '@/cities/dto/create-city.dto';
import { ICommand } from '@nestjs/cqrs';
import { CityEntity } from '@/cities/entities/city.entity';

export class CreateCityLogCommand implements ICommand {
  constructor(public readonly dto: CreateCityDto) {}
}

export class CreateCitySuccessLogCommand implements ICommand {
  constructor(public readonly city: CityEntity) {}
}

export class CreateCityFailLogCommand implements ICommand {
  constructor(public readonly dto: CreateCityDto, public readonly error: any) {}
}

export class DeleteCityByIdLogCommand implements ICommand {
  constructor(public readonly id: number) {}
}

export class DeleteCityByIdSuccessLogCommand implements ICommand {
  constructor(public readonly id: number) {}
}

export class DeleteCityByIdFailLogCommand implements ICommand {
  constructor(public readonly id: number, public readonly error: any) {}
}

export const CitiesLogCommands = {
  CreateCityLogCommand,
  CreateCitySuccessLogCommand,
  CreateCityFailLogCommand,
  DeleteCityByIdLogCommand,
  DeleteCityByIdSuccessLogCommand,
  DeleteCityByIdFailLogCommand,
};
