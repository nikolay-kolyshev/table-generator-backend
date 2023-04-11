import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;
}
