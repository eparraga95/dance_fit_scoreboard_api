import { Event } from 'src/events/entities/event.entity';
import { Player } from 'src/players/entities/player.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'scores' })
export class Score {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  score_id: number;

  @Column()
  value: number;

  @Column()
  music: string;

  @Column()
  mode: string;

  @Column()
  level: number;

  @Column()
  grade: string;

  @Column()
  plate: string;

  @Column({default: false})
  validated: boolean;

  @Column()
  created_at: Date;

  @ManyToOne(() => Player, (player) => player.scores)
  player: Player;

  @ManyToOne(() => Event, (event) => event.scores)
  event: Event
}
