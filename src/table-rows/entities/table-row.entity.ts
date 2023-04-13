import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { CityEntity } from '@/cities/entities/city.entity';
import { Exclude } from 'class-transformer';
import { TableEntity } from '@/tables/entities/table.entity';

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

  @Exclude()
  @ManyToOne(() => TableEntity, (table: TableEntity) => table.rows)
  table: TableEntity;

  @Exclude()
  @ManyToOne(() => CityEntity, (city: CityEntity) => city.tableRows)
  city: CityEntity;
}
