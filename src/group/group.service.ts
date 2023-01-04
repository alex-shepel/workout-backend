import {
  forwardRef,
  ForwardReference,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GroupEntity } from '@/group/group.entity';
import { CreateGroupDto } from '@/group/dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/user/user.entity';
import { ExerciseService } from '@/exercise/exercise.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @Inject<ForwardReference<ExerciseService>>(forwardRef(() => ExerciseService))
    private readonly exerciseService: ExerciseService,
  ) {}

  async create(dto: CreateGroupDto, user: UserEntity): Promise<GroupEntity> {
    const group = new GroupEntity();
    Object.assign(group, { ...dto, User: user });
    return await this.groupRepository.save(group);
  }

  async getAll(userID: UserEntity['ID']): Promise<Array<GroupEntity>> {
    return await this.groupRepository.find({
      where: {
        User: { ID: userID },
      },
    });
  }

  async getById(
    userId: UserEntity['ID'],
    groupId: GroupEntity['ID'],
    relations: Array<keyof GroupEntity> = [],
  ): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({
      where: {
        ID: groupId,
        User: { ID: userId },
      },
      relations,
    });
    if (!group) {
      throw new HttpException('Group does not exist.', HttpStatus.NOT_FOUND);
    }
    return group;
  }

  async deleteById(userId: UserEntity['ID'], groupId: GroupEntity['ID']): Promise<GroupEntity> {
    const group = await this.getById(userId, groupId, ['Exercises']);
    await this.exerciseService.deleteByGroupId(userId, groupId);
    await this.groupRepository.delete({
      ID: groupId,
      User: { ID: userId },
    });
    return group;
  }
}
