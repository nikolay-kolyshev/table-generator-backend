import { CityEntity } from '@/cities/entities/city.entity';
import { CreateCityDto } from '@/cities/dto/create-city.dto';
import { IEvent } from '@nestjs/cqrs';

export class CreateCityEvent implements IEvent {
  constructor(public readonly dto: CreateCityDto) {}
}

export class CreateCitySuccessEvent implements IEvent {
  constructor(public readonly city: CityEntity) {}
}

export class CreateCityFailEvent implements IEvent {
  constructor(public readonly dto: CreateCityDto, public readonly error: any) {}
}

export class DeleteCityByIdEvent implements IEvent {
  constructor(public readonly id: number) {}
}

export class DeleteCityByIdSuccessEvent implements IEvent {
  constructor(public readonly id: number) {}
}

export class DeleteCityByIdFailEvent implements IEvent {
  constructor(public readonly id: number, public readonly error: any) {}
}

export const CitiesEvents = {
  CreateCityEvent,
  CreateCitySuccessEvent,
  CreateCityFailEvent,
  DeleteCityByIdEvent,
  DeleteCityByIdSuccessEvent,
  DeleteCityByIdFailEvent,
};
