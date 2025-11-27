import { Column, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../location/entities/location.entity";

export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    salary: number;

    @Column()
    employee: boolean;

    @OneToOne(() => Location)
    property: Location;

    @ManyToMany(() => Location)
    favPlaces: Location[];
}
