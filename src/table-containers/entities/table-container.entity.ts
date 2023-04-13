import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { TableEntity } from '@/tables/entities/table.entity';

@Entity('tableContainer')
export class TableContainerEntity extends AbstractEntity {
  @OneToOne(() => TableEntity)
  @JoinColumn()
  mainTable: TableEntity;

  @OneToMany(() => TableEntity, (table: TableEntity) => table.container)
  sideTables: TableEntity[];
}
