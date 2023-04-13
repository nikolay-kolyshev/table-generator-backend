import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '@/cities/entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesQueryRepository {
  constructor(
    @InjectRepository(CityEntity)
    private citiesRepository: Repository<CityEntity>,
  ) {}

  async findById(id: number): Promise<CityEntity> {
    return await this.citiesRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<CityEntity> {
    return await this.citiesRepository.findOne({ where: { name } });
  }

  async findAll(): Promise<CityEntity[]> {
    return await this.citiesRepository.find();
  }
}
