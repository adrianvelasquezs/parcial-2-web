import { Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "../../character/entities/character.entity";

export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    cost: number;

    @OneToOne(() => Character)
    owner: Character;
}
