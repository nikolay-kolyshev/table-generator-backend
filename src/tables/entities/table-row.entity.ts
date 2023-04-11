import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { TableEntity } from './table.entity';
import { CityEntity } from '@/cities/entities/city.entity';
import { Exclude } from 'class-transformer';

@Entity('tableRows')
export class TableRowEntity extends AbstractEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  surname: string;

  @Column({
    nullable: false,
  })
  age: number;

  @ManyToOne(() => CityEntity)
  @JoinColumn()
  @Column({
    nullable: false,
  })
  city: CityEntity;

  @Exclude()
  @ManyToOne(() => TableEntity, (table: TableEntity) => table.rows)
  table: TableEntity;
}
