import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';
import { TableEntity } from '@/tables/entities/table.entity';

@Injectable()
export class TableContainersCommandRepository {
  constructor(
    @InjectRepository(TableContainerEntity)
    private tableContainersRepository: Repository<TableContainerEntity>,
  ) {}

  async create(mainTable: TableEntity) {
    const tableContainer = await this.tableContainersRepository.create();
    tableContainer.mainTable = mainTable;
    return await this.tableContainersRepository.save(tableContainer);
  }

  async deleteById(id: number) {
    await this.tableContainersRepository.delete({ id });
  }
}
