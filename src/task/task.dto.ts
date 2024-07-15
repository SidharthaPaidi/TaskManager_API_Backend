import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    name: string;

    completed?: boolean;

    user?: string; // Add this line if you need to explicitly define user in the DTO
}
