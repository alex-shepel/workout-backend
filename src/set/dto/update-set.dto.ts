import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SetEntity } from '@/set/set.entity';

class UpdateSetDto {
  @ApiProperty({
    example: 40,
    description: 'The working weight',
  })
  @IsNotEmpty()
  readonly Weight: SetEntity['Weight'];

  @ApiProperty({
    example: 12,
    description: 'The repetitions count',
  })
  @IsNotEmpty()
  readonly Repetitions: SetEntity['Repetitions'];

  @ApiProperty({
    example: true,
    description: "The set's state",
  })
  @IsNotEmpty()
  readonly Completed: SetEntity['Completed'];
}

export default UpdateSetDto;
