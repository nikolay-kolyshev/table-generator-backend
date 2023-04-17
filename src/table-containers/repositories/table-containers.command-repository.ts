import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';
import { TablesCommandRepository } from '@/tables/repositories/tables-command-repository.service';
import { CopyTableDto } from '@/table-containers/dto/copy-table.dto';

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
    tableContainer.sideTables = [];
    return await this.tableContainersRepository.save(tableContainer);
  }

  async copyTable(dto: CopyTableDto) {
    const tableContainer = await this.tableContainersRepository.findOneBy({
      id: dto.tableContainerId,
    });
    const copiedTable = await this.tableCommandRepository.findById(
      dto.copiedTableId,
    );
    const createdSideTable = await this.tableCommandRepository.create({
      containerId: tableContainer.id,
      rows: copiedTable.rows,
    });
    tableContainer.sideTables.push(createdSideTable);
    return await this.tableContainersRepository.save(tableContainer);
  }

  async deleteById(id: number) {
    await this.tableContainersRepository.delete({ id });
  }
}
