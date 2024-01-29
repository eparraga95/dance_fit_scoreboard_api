import { Player } from "src/players/entities/player.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'scores'})
export class Score {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    }) 
    score_id: number;

    @Column()
    value: number;

    @Column()
    music: string;

    @Column()
    mode: string;

    @Column()
    grade: string;

    @Column()
    plate: string;

    @Column()
    validated: boolean;

    @Column()
    created_at: string;

    @ManyToOne(() => Player, (player) => player.scores)
    player: Player
}