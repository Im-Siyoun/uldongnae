import { PartialType } from '@nestjs/mapped-types';

import { CreateFAQDto } from './create-FAQ.dto';

export class UpdateFAQDto extends PartialType(CreateFAQDto) {}
