import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '@/cities/entities/city.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from '@/cities/dto/create-city.dto';

@Injectable()
export class CitiesCommandRepository {
  constructor(
    @InjectRepository(CityEntity)
    private citiesRepository: Repository<CityEntity>,
  ) {}

  async create(dto: CreateCityDto) {
    const city = await this.citiesRepository.create(dto);
    return await this.citiesRepository.save(city);
  }

  async deleteById(id: number) {
    await this.citiesRepository.delete({ id });
  }
}
