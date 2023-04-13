import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CityEntity } from '@/cities/entities/city.entity';
import { CitiesQueryRepository } from '@/cities/repositories/citites.query-repository';
import {
  GetAllCitiesQuery,
  GetCityByIdQuery,
  GetCityByNameQuery,
} from '@/cities/query-bus/cities.queries';

@QueryHandler(GetAllCitiesQuery)
class GetAllCitiesQueryHandler
  implements IQueryHandler<GetAllCitiesQuery, CityEntity[]>
{
  constructor(private readonly citiesQueryRepository: CitiesQueryRepository) {}

  public async execute(): Promise<CityEntity[]> {
    try {
      return await this.citiesQueryRepository.findAll();
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске городов',
      );
    }
  }
}
@QueryHandler(GetCityByNameQuery)
class GetCityByNameQueryHandler
  implements IQueryHandler<GetCityByNameQuery, CityEntity>
{
  constructor(private readonly citiesQueryRepository: CitiesQueryRepository) {}

  public async execute(query: GetCityByNameQuery): Promise<CityEntity> {
    try {
      return await this.citiesQueryRepository.findByName(query.name);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске городов',
      );
    }
  }
}
@QueryHandler(GetCityByIdQuery)
class GetCityByIdQueryHandler
  implements IQueryHandler<GetCityByIdQuery, CityEntity>
{
  constructor(private readonly citiesQueryRepository: CitiesQueryRepository) {}

  public async execute(query: GetCityByIdQuery): Promise<CityEntity> {
    try {
      return await this.citiesQueryRepository.findById(query.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'Внутренняя серверная ошибка при поиске города',
      );
    }
  }
}

export const CitiesQueriesHandlers = {
  GetAllCitiesQueryHandler,
  GetCityByNameQueryHandler,
  GetCityByIdQueryHandler,
};
