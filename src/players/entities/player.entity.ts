import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Score } from 'src/scores/entities/score.entity';
import { Event } from 'src/events/entities/event.entity';
import { Category } from 'src/categories/entities/category.entity';

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

  @Column({ nullable: true })
  profilePicture: string;

  @Column()
  role: string;

  @OneToMany(() => Score, (score) => score.player)
  scores: Score[];

  @ManyToMany(() => Event, (event) => event.players)
  events: Event[];

  @ManyToMany(() => Category, (category) => category.players)
  categories: Category[];
}
