import { PartialType } from '@nestjs/mapped-types';

import { CreateGatheringDto } from './create-gathering.dto';

export class UpdateGatheringDto extends PartialType(CreateGatheringDto) {}
