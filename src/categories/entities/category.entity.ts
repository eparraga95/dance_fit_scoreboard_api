import { Event } from 'src/events/entities/event.entity';
import { Music } from 'src/musics/entities/music.entity';
import { Player } from 'src/players/entities/player.entity';
import { Score } from 'src/scores/entities/score.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
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

  @ManyToMany(() => Music, (music) => music.categories)
  @JoinTable()
  musics: Music[];

  @OneToMany(() => Score, (score) => score.category)
  @JoinColumn()
  scores: Score[];

  @ManyToOne(() => Event, (event) => event.categories)
  event: Event;

  @ManyToMany(() => Player, (player) => player.categories)
  @JoinTable()
  players: Player[]
}
