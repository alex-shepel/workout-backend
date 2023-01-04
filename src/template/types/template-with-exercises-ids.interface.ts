import { TemplateEntity } from '@/template/template.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';

export default interface TemplateWithExercisesIDs {
  ID: TemplateEntity['ID'];
  Title: TemplateEntity['Title'];
  Description: TemplateEntity['Description'];
  ExercisesIDs: Array<ExerciseEntity['ID']>;
}
