import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from '@/tables/entities/table.entity';
import { CreateTableCommandDto } from '@/tables/dto/create-table-command.dto';

@Injectable()
export class TablesCommandRepository {
  constructor(
    @InjectRepository(TableEntity)
    private tablesRepository: Repository<TableEntity>,
  ) {}

  async findById(id: number): Promise<TableEntity> {
    return this.tablesRepository.findOneBy({ id });
  }

  async create(dto: CreateTableCommandDto) {
    const table = await this.tablesRepository.create(dto);
    if (dto.isMain) {
      return await this.tablesRepository.save(table);
    }
    if (dto.rows) {
      const tableRows = dto.rows.map((row) => ({
        ...row,
        table,
      }));
      table.rows = tableRows;
    }
    return await this.tablesRepository.save(table);
  }

  async deleteById(id: number) {
    await this.tablesRepository.delete({ id });
  }
}
