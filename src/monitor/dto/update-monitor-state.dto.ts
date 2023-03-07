import { ApiProperty } from '@nestjs/swagger';
import { MonitorState } from '@/monitor/types';

class UpdateMonitorStateDto implements Partial<MonitorState> {
  @ApiProperty({
    example: 4,
    description: 'The sequential number of the last completed template',
  })
  readonly LastTemplateSequentialNumber?: number;

  @ApiProperty({
    example: 42,
    description: 'The count of all completed trainings',
  })
  readonly TrainingsCount?: number;
}

export default UpdateMonitorStateDto;
