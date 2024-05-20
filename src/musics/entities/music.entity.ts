import { Phase } from 'src/phases/entities/phase.entity';
import { Score } from 'src/scores/entities/score.entity';
import { SongList } from 'src/song_lists/entities/song_list.entity';
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

  @OneToMany(() => Score, (score) => score.music, { onDelete: 'CASCADE' })
  @JoinColumn()
  scores: Score[];

  @ManyToMany(() => Phase, (phase) => phase.musics, { onDelete: 'CASCADE' })
  phases: Phase[];

  @ManyToMany(() => SongList, (song_list) => song_list.musics, {
    onDelete: 'CASCADE',
  })
  song_lists: SongList[];
}
