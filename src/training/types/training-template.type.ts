import { Modified, RequiredProperty } from '@/types';
import { TemplateEntity } from '@/template/template.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';

type TrainingTemplate = Modified<
  TemplateEntity,
  { Exercises: Array<RequiredProperty<ExerciseEntity, 'Sets'>> }
>;

export default TrainingTemplate;
