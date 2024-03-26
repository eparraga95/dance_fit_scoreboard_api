import { Category } from 'src/categories/entities/category.entity';
import { EventType } from 'src/event_types/entities/event_type.entity';
import { Player } from 'src/players/entities/player.entity';
import { Score } from 'src/scores/entities/score.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  event_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  status: boolean;

  @ManyToMany(() => Player, (player) => player.events, { onDelete: 'CASCADE' })
  players: Player[];

  @OneToMany(() => Score, (score) => score.event)
  scores: Score[];

  @OneToMany(() => Category, (category) => category.event, {
    onDelete: 'CASCADE',
  })
  categories: Category[];

  @ManyToOne(() => EventType, (event_type) => event_type.events)
  event_type: EventType
}
