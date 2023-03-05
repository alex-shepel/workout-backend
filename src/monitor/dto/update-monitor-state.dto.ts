import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MonitorState } from '@/monitor/types';

class UpdateMonitorStateDto implements MonitorState {
  @ApiProperty({
    example: 4,
    description: 'The sequential number of the last completed template',
  })
  @IsNotEmpty()
  readonly LastTemplateSequentialNumber: number;

  @ApiProperty({
    example: 42,
    description: 'The count of all completed trainings',
  })
  readonly TrainingsCount: number;
}

export default UpdateMonitorStateDto;
