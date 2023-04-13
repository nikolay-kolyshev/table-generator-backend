import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';
import { TablesCommandRepository } from '@/tables/repositories/tables-command-repository.service';

@Injectable()
export class TableContainersCommandRepository {
  constructor(
    @InjectRepository(TableContainerEntity)
    private tableContainersRepository: Repository<TableContainerEntity>,
    private tableCommandRepository: TablesCommandRepository,
  ) {}

  async create() {
    const tableContainer = await this.tableContainersRepository.create();
    const table = await this.tableCommandRepository.create({
      containerId: tableContainer.id,
      isMain: true,
    });
    tableContainer.mainTable = table;
    return await this.tableContainersRepository.save(tableContainer);
  }

  async deleteById(id: number) {
    await this.tableContainersRepository.delete({ id });
  }
}
