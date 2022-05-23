import { ApiProperty } from "@nestjs/swagger";

export class PaginatedDto<T> {
    @ApiProperty()
    data: T[];

    @ApiProperty()
    count: number;

    @ApiProperty()
    total: number;
}