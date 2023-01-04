import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { GroupEntity } from '@/group/group.entity';
import { TemplateEntity } from '@/template/template.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: 1, description: 'The autogenerated unique identifier.' })
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @ApiProperty({
    example: 'alex@shepel.com',
    description: "User's email. It will be used for the account activation.",
  })
  @Column({
    unique: true,
  })
  Email: string;

  @ApiProperty({
    example: 1,
    description: "User's name. It will be displayed as nickname inside the app.",
  })
  @Column({
    nullable: true,
  })
  Name: string;

  @ApiProperty({
    example: '31415',
    description: 'The password.',
  })
  @Column({
    select: false,
  })
  Password: string;

  @BeforeInsert()
  async hashPassword() {
    this.Password = await hash(this.Password, Number(process.env.SALT));
  }

  @OneToMany(() => ExerciseEntity, exercise => exercise.User)
  Exercises: ExerciseEntity[];

  @OneToMany(() => GroupEntity, group => group.User)
  Groups: GroupEntity[];

  @OneToMany(() => GroupEntity, template => template.User)
  Templates: TemplateEntity[];
}