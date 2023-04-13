import { Injectable } from '@nestjs/common';
import { ISaga, ofType, Saga } from '@nestjs/cqrs';
import { map } from 'rxjs';
import {
  CreateCityEvent,
  CreateCityFailEvent,
  CreateCitySuccessEvent,
  DeleteCityByIdEvent,
  DeleteCityByIdFailEvent,
  DeleteCityByIdSuccessEvent,
} from '@/cities/event-bus/cities.events';
import {
  CreateCityFailLogCommand,
  CreateCityLogCommand,
  CreateCitySuccessLogCommand,
  DeleteCityByIdFailLogCommand,
  DeleteCityByIdLogCommand,
  DeleteCityByIdSuccessLogCommand,
} from '@/cities/command-bus/log/cities.log.commands';

@Injectable()
export class CitiesSagas {
  @Saga()
  createCity: ISaga<CreateCityEvent, CreateCityLogCommand> = (events$) => {
    return events$.pipe(
      ofType(CreateCityEvent),
      map((event) => new CreateCityLogCommand(event.dto)),
    );
  };

  @Saga()
  createCitySuccess: ISaga<
    CreateCitySuccessEvent,
    CreateCitySuccessLogCommand
  > = (events$) => {
    return events$.pipe(
      ofType(CreateCitySuccessEvent),
      map((event) => new CreateCitySuccessLogCommand(event.city)),
    );
  };

  @Saga()
  createCityFail: ISaga<CreateCityFailEvent, CreateCityFailLogCommand> = (
    events$,
  ) => {
    return events$.pipe(
      ofType(CreateCityFailEvent),
      map((event) => new CreateCityFailLogCommand(event.dto, event.error)),
    );
  };

  @Saga()
  deleteCityById: ISaga<DeleteCityByIdEvent, DeleteCityByIdLogCommand> = (
    events$,
  ) => {
    return events$.pipe(
      ofType(DeleteCityByIdEvent),
      map((event) => new DeleteCityByIdLogCommand(event.id)),
    );
  };

  @Saga()
  deleteCityByIdSuccess: ISaga<
    DeleteCityByIdSuccessEvent,
    DeleteCityByIdSuccessLogCommand
  > = (events$) => {
    return events$.pipe(
      ofType(DeleteCityByIdSuccessEvent),
      map((event) => new DeleteCityByIdSuccessLogCommand(event.id)),
    );
  };

  @Saga()
  deleteCityByIdFail: ISaga<
    DeleteCityByIdFailEvent,
    DeleteCityByIdFailLogCommand
  > = (events$) => {
    return events$.pipe(
      ofType(DeleteCityByIdFailEvent),
      map((event) => new DeleteCityByIdFailLogCommand(event.id, event.error)),
    );
  };
}
