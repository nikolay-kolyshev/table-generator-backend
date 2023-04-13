import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCityDto } from '@/cities/dto/create-city.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateCityCommand,
  DeleteCityByIdCommand,
} from '@/cities/command-bus/cities.commands';
import {
  GetAllCitiesQuery,
  GetCityByIdQuery,
  GetCityByNameQuery,
} from '@/cities/query-bus/cities.queries';
import { CityEntity } from '@/cities/entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getAllCities() {
    return await this.queryBus.execute(new GetAllCitiesQuery());
  }

  async getCityById(id: number) {
    const city = await this.queryBus.execute(new GetCityByIdQuery(id));
    if (!city) {
      throw new NotFoundException(`Город с id ${id} не найден`);
    }
    return city;
  }

  async createCity(dto: CreateCityDto) {
    const cityCandidate = await this.findCityByName(dto.name);
    if (cityCandidate) {
      throw new BadRequestException(
        `Город ${cityCandidate.name} уже существует!`,
      );
    }
    return await this.commandBus.execute(new CreateCityCommand(dto));
  }

  async deleteCityById(id: number): Promise<void> {
    await this.commandBus.execute(new DeleteCityByIdCommand(id));
  }

  private async findCityByName(name: string): Promise<CityEntity> {
    return await this.queryBus.execute(new GetCityByNameQuery(name));
  }
}
