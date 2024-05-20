import { Event } from "src/events/entities/event.entity";
import { Player } from "src/players/entities/player.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'comfort_levels'})
export class ComfortLevel {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    comfort_level_id: number;

    @Column({ nullable: true })
    level_single: number

    @Column({ nullable: true })
    level_double: number

    @ManyToOne(() => Player, (player) => player.comfort_levels, { onDelete: 'CASCADE' })
    player: Player

    @ManyToOne(() => Event, (event) => event.comfort_levels, {onDelete: 'CASCADE' })
    event: Event
}