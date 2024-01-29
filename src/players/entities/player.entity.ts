import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Score } from "src/scores/entities/score.entity";

@Entity({ name: 'players'})
export class Player {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    player_id: number;

    @Column()
    nickname: string;

    @Column()
    password: string;

    @Column()
    is_admin: boolean;

    @OneToMany(() => Score, (score) => score.player)
    scores: Score[]

}