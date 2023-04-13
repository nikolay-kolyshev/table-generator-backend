import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableRowEntity } from '@/table-rows/entities/table-row.entity';
import { CreateTableRowDto } from '@/table-rows/dto/create-table-row.dto';
import { UpdateTableRowDto } from '@/table-rows/dto/update-table-row.dto';

@Injectable()
export class TableRowsCommandRepository {
  constructor(
    @InjectRepository(TableRowEntity)
    private tableRowsRepository: Repository<TableRowEntity>,
  ) {}

  async create(dto: CreateTableRowDto) {
    const tableRow = await this.tableRowsRepository.create(dto);
    return await this.tableRowsRepository.save(tableRow);
  }

  async updateById(id: number, dto: UpdateTableRowDto) {
    return await this.tableRowsRepository.update({ id }, dto);
  }

  async deleteById(id: number) {
    await this.tableRowsRepository.delete({ id });
  }
}
