import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '../../location/entities/location.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  salary: number;

  @Column()
  employee: boolean;

  @OneToOne(() => Location, (location) => location.owner)
  @JoinColumn()
  property: Location;

  @ManyToMany(() => Location)
  @JoinTable()
  favPlaces: Location[];
}
