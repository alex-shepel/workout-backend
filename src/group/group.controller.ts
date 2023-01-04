import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupService } from '@/group/group.service';
import { GroupEntity } from '@/group/group.entity';
import { CreateGroupDto } from '@/group/dto';
import { AuthGuard } from '@/user/guards';
import { User } from '@/user/decorators';
import { UserEntity } from '@/user/user.entity';

@ApiTags('Groups')
@Controller('api/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: 'Creates the new exercises group' })
  @ApiResponse({ status: 201, type: GroupEntity })
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@User() user: UserEntity, @Body() dto: CreateGroupDto): Promise<GroupEntity> {
    return await this.groupService.create(dto, user);
  }

  @ApiOperation({ summary: 'Returns all present exercises groups' })
  @ApiResponse({ status: 200, type: [GroupEntity] })
  @Get()
  @UseGuards(AuthGuard)
  getAll(@User('ID') userId: UserEntity['ID']): Promise<Array<GroupEntity>> {
    return this.groupService.getAll(userId);
  }

  @ApiOperation({
    summary: 'Removes exercises group by given ID. Returns deleted group.',
  })
  @ApiResponse({ status: 200, type: GroupEntity })
  @Delete(':groupId')
  @UseGuards(AuthGuard)
  async delete(
    @User('ID') userId: UserEntity['ID'],
    @Param('groupId') groupId: GroupEntity['ID'],
  ): Promise<GroupEntity> {
    return await this.groupService.deleteById(userId, groupId);
  }
}
