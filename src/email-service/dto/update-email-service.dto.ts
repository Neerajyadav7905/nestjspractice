import { PartialType } from '@nestjs/swagger';
import { CreateEmailServiceDto } from './create-email-service.dto';

export class UpdateEmailServiceDto extends PartialType(CreateEmailServiceDto) {}
