import { PartialType } from '@nestjs/mapped-types';
import { CreateCurdDto } from './create-curd.dto';

export class UpdateCurdDto extends PartialType(CreateCurdDto) {}
