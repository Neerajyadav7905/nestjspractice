import { ApiProperty } from "@nestjs/swagger";

export class loginDto {

    @ApiProperty()
    email: String;

    @ApiProperty()
    password: String;
}
