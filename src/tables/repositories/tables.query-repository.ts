import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from '@/tables/entities/table.entity';

@Injectable()
export class TablesQueryRepository {
  constructor(
    @InjectRepository(TableEntity)
    private tablesRepository: Repository<TableEntity>,
  ) {}

  async getAllSideTablesByTableContainerId(
    tableContainerId: number,
  ): Promise<TableEntity[]> {
    return await this.tablesRepository.find({
      where: { container: { id: tableContainerId }, isMain: false },
    });
  }

  async getMainTableByTableContainerId(
    tableContainerId: number,
  ): Promise<TableEntity> {
    return await this.tablesRepository.findOne({
      where: { container: { id: tableContainerId }, isMain: true },
    });
  }

  async findById(id: number): Promise<TableEntity> {
    return await this.tablesRepository.findOne({ where: { id } });
  }
}
