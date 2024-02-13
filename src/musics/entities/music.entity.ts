import { Category } from 'src/categories/entities/category.entity';
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

  @Column({ unique: true })
  name: string;

  @Column()
  level: number;

  @Column()
  mode: string;

  @ManyToMany(() => Category, (category) => category.musics)
  categories: Category[];

  @OneToMany(() => Score, (score) => score.music)
  @JoinColumn()
  scores: Score[];
}
