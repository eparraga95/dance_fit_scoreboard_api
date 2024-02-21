import { Category } from "src/categories/entities/category.entity";
import { Music } from "src/musics/entities/music.entity";
import { Score } from "src/scores/entities/score.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'phases'})
export class Phase {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    phase_id: number

    @Column()
    phase_number: number

    @Column()   
    music_number: number

    @Column('text', { array: true })
    modes_available: string[]

    @Column()
    passing_players: number

    @ManyToMany(() => Music, (music) => music.phases, { onDelete: 'CASCADE'})
    @JoinTable()
    musics: Music[]

    @ManyToOne(() => Category, (category) => category.phases)
    category: Category

    @OneToMany(() => Score, (score) => score.phase, { onDelete: 'CASCADE'})
    scores: Score[]
}