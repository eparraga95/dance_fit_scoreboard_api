import { Event } from 'src/events/entities/event.entity';
import { Music } from 'src/musics/entities/music.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'song_lists' })
export class SongList {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  song_list_id: number;

  @ManyToMany(() => Music, (music) => music.song_lists)
  @JoinTable()
  musics: Music[];

  @OneToOne(() => Event, (event) => event.song_list, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  event: Event;
}
