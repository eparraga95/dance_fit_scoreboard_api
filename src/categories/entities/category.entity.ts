import { Event } from 'src/events/entities/event.entity';
import { Phase } from 'src/phases/entities/phase.entity';
import { Player } from 'src/players/entities/player.entity';
import { Score } from 'src/scores/entities/score.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  category_id: number;

  @Column()
  name: string;

  @Column()
  level_min: number;

  @Column()
  level_max: number;

  @OneToMany(() => Score, (score) => score.category, { onDelete: 'CASCADE' })
  @JoinColumn()
  scores: Score[];

  @ManyToOne(() => Event, (event) => event.categories, { onDelete: 'CASCADE' })
  event: Event;

  @ManyToMany(() => Player, (player) => player.categories)
  players: Player[];

  @Column()
  number_of_phases: number;

  @OneToMany(() => Phase, (phase) => phase.category)
  phases: Phase[];
}
