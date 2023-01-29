import { Controller } from '@nestjs/common';
import { SetService } from '@/set/set.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sets')
@Controller('api/sets')
export class SetController {
  constructor(private readonly setService: SetService) {}
}
