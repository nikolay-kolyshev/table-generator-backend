import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { TableRowEntity } from '@/table-rows/entities/table-row.entity';
import { Exclude } from 'class-transformer';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';

@Entity('tables')
export class TableEntity extends AbstractEntity {
  @Column({
    nullable: false,
  })
  isMain: boolean;

  @OneToMany(() => TableRowEntity, (tableRow) => tableRow.table)
  rows: TableRowEntity[];

  @Exclude()
  @OneToOne(
    () => TableContainerEntity,
    (tableContainer) => tableContainer.mainTable,
  )
  mainContainer: TableContainerEntity;

  @Exclude()
  @ManyToOne(
    () => TableContainerEntity,
    (tableContainer) => tableContainer.sideTables,
  )
  sideContainer: TableContainerEntity;
}
