import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from '../../character/entities/character.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  cost: number;

  @OneToOne(() => Character, (character) => character.property)
  owner: Character;

  @ManyToOne(() => Character)
  favorites: Character[];
}
