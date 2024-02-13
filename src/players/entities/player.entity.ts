import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Score } from 'src/scores/entities/score.entity';
import { Event } from 'src/events/entities/event.entity';

@Entity({ name: 'players' })
export class Player {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  player_id: number;

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Score, (score) => score.player)
  scores: Score[];

  @ManyToMany(() => Event, (event) => event.players)
  events: Event[];
}
