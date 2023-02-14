import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { SetService } from '@/set/set.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/user/guards';
import { User } from '@/user/decorators';
import { UserEntity } from '@/user/user.entity';
import { SetEntity } from '@/set/set.entity';
import { UpdateSetDto } from '@/set/dto';

@ApiTags('Sets')
@Controller('api/sets')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @ApiOperation({
    summary: 'Finds and completes a set by a given ID.',
  })
  @ApiResponse({ status: 200, type: SetEntity })
  @Post(':setId')
  @UseGuards(AuthGuard)
  async update(
    @User('ID') userId: UserEntity['ID'],
    @Param('setId') setId: SetEntity['ID'],
    @Body() dto: UpdateSetDto,
  ): Promise<SetEntity> {
    return await this.setService.update(userId, setId, dto);
  }
}
