export class CreateCharacterDto {
    name: string;
    type: string;
    age: number;
    employee: boolean;
    property?: number;
    favPlaces?: number[];
}
