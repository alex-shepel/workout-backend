import { GroupEntity } from '@/group/group.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';

export default interface ExerciseWithGroupID {
  ID: ExerciseEntity['ID'];
  Title: ExerciseEntity['Title'];
  Description: ExerciseEntity['Description'];
  GroupID: GroupEntity['ID'];
}
