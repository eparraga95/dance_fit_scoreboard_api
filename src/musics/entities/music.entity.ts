import { Category } from 'src/categories/entities/category.entity';
import { Phase } from 'src/phases/entities/phase.entity';
import { Score } from 'src/scores/entities/score.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'musics' })
export class Music {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  music_id: number;

  @Column()
  name: string;

  @Column()
  level: number;

  @Column()
  mode: string;

  @OneToMany(() => Score, (score) => score.music, { onDelete: 'CASCADE'})
  @JoinColumn()
  scores: Score[];

  @ManyToMany(() => Phase, (phase) => phase.musics, { onDelete: 'CASCADE'})
  phases: Phase[]
}
