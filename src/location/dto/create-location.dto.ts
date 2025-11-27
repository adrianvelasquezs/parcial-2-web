export class CreateLocationDto {
    name: string;
    type: string;
    cost: number;
    owner: number;
    favCharacters?: number[];
}
