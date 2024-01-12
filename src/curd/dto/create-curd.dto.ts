import { ApiProperty } from "@nestjs/swagger";

export class CreateCurdDto {
    @ApiProperty()
    name: String;
  
    @ApiProperty()
    email: String;

    @ApiProperty()
    password: String;
}
