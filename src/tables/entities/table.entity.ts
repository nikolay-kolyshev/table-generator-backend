import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { TableRowEntity } from './table-row.entity';
import { Exclude } from 'class-transformer';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';

@Entity('tables')
export class TableEntity extends AbstractEntity {
  @OneToMany(() => TableRowEntity, (tableRow) => tableRow.table)
  rows: TableRowEntity[];

  @Exclude()
  @ManyToOne(
    () => TableContainerEntity,
    (tableContainer) => tableContainer.sideTables,
  )
  container: TableContainerEntity;
}
