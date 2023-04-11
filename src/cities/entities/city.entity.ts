import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';

@Entity('cities')
export class CityEntity extends AbstractEntity {
  @Column({
    nullable: false,
  })
  name: string;
}
