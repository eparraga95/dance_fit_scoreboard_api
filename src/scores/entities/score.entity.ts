import { Category } from 'src/categories/entities/category.entity';
import { Event } from 'src/events/entities/event.entity';
import { Music } from 'src/musics/entities/music.entity';
import { Phase } from 'src/phases/entities/phase.entity';
import { Player } from 'src/players/entities/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'scores' })
export class Score {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  score_id: number;

  @Column()
  value: number;

  @Column()
  perfect: number;

  @Column()
  great: number;

  @Column()
  good: number;

  @Column()
  bad: number;

  @Column()
  miss: number;

  @Column()
  max_combo: number;

  @Column()
  stage_pass: boolean;

  @Column()
  total_notes: number;

  @Column()
  grade: string;

  @Column()
  plate: string;

  @Column({ default: false })
  validated: boolean;

  @Column()
  created_at: Date;

  @ManyToOne(() => Player, (player) => player.scores)
  @JoinColumn()
  player: Player;

  @ManyToOne(() => Event, (event) => event.scores)
  event: Event;

  @ManyToOne(() => Category, (category) => category.scores)
  category: Category;

  @ManyToOne(() => Music, (music) => music.scores)
  music: Music;

  @ManyToOne(() => Phase, (phase) => phase.scores)
  phase: Phase;
}
