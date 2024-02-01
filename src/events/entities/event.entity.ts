import { Player } from 'src/players/entities/player.entity';
import { Score } from 'src/scores/entities/score.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  event_id: number;

  @Column()
  name: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  starttime: string

  @Column()
  endtime: string

  @ManyToMany(() => Player, (player) => player.events, { eager: true })
  @JoinTable()
  players: Player[];

  @OneToMany(() => Score, (score) => score.event)
  scores: Score[];
}
