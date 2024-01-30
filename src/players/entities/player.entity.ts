import {
  Column,
  Entity,
  JoinTable,
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

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  is_admin: boolean;

  @OneToMany(() => Score, (score) => score.player)
  scores: Score[];

  @ManyToMany(() => Event, (event) => event.players)
  events: Event[];
}
