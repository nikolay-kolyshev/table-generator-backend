import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '@/cities/entities/city.entity';
import { CitiesSagas } from '@/cities/event-bus/cities.sagas';
import { CitiesCommands } from '@/cities/command-bus/cities.commands';
import { CitiesQueries } from '@/cities/query-bus/cities.queries';
import { CitiesCommandHandlers } from '@/cities/command-bus/cities.command-handlers';
import { CitiesQueriesHandlers } from '@/cities/query-bus/cities.queries-handlers';
import { CitiesEvents } from '@/cities/event-bus/cities.events';
import { CitiesQueryRepository } from '@/cities/repositories/citites.query-repository';
import { CitiesCommandRepository } from '@/cities/repositories/citites.command-repository';
import { CitiesLogCommands } from '@/cities/command-bus/log/cities.log.commands';
import { CitiesCommandLogHandlers } from '@/cities/command-bus/log/cities.log.command-handlers';
import { mapDependencyObjectsToModuleProviders } from '@/common/helpers/map-dependency-objects-to-module.providers.helper';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CityEntity])],
  providers: [
    CitiesService,
    CitiesSagas,
    CitiesQueryRepository,
    CitiesCommandRepository,
    ...mapDependencyObjectsToModuleProviders([
      CitiesQueries,
      CitiesCommands,
      CitiesCommandHandlers,
      CitiesQueriesHandlers,
      CitiesEvents,
      CitiesLogCommands,
      CitiesCommandLogHandlers,
    ]),
  ],
  controllers: [CitiesController],
})
export class CitiesModule {}
