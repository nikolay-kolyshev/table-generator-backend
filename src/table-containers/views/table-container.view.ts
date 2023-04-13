import { AbstractEntity } from '@/common/entities/abstract.entity';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';

export class TableContainerView extends AbstractEntity {
  tablesCount: number;

  constructor(data: TableContainerEntity) {
    super();
    this.tablesCount = data.sideTables?.length ? data.sideTables.length : 0;
    this.tablesCount = data.mainTable ? this.tablesCount + 1 : this.tablesCount;
  }
}
