import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';
import { TableContainerView } from '@/table-containers/views/table-container.view';

@Injectable()
export class TableContainersQueryRepository {
  constructor(
    @InjectRepository(TableContainerEntity)
    private tableContainersRepository: Repository<TableContainerEntity>,
  ) {}

  async getAllPreview(): Promise<TableContainerView[]> {
    const tableContainers = await this.tableContainersRepository.find();
    if (tableContainers.length) {
      return tableContainers.map(
        (tableContainer) => new TableContainerView(tableContainer),
      );
    }
    return [];
  }

  async getById(id: number): Promise<TableContainerEntity> {
    return await this.tableContainersRepository.findOneBy({ id });
  }
}
