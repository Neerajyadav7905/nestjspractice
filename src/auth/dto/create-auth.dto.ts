import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {

    @ApiProperty()
    email: String;

    @ApiProperty()
    password: String;
}
