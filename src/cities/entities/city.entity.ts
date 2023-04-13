import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Exclude } from 'class-transformer';
import { TableRowEntity } from '@/table-rows/entities/table-row.entity';

@Entity('cities')
export class CityEntity extends AbstractEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Exclude()
  @OneToMany(() => TableRowEntity, (tableRow: TableRowEntity) => tableRow.city)
  tableRows: TableRowEntity[];
}
