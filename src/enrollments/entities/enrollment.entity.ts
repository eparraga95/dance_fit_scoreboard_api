import { Event } from "src/events/entities/event.entity";
import { Player } from "src/players/entities/player.entity";
import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'enrollments'})
export class Enrollment {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    enrollment_id: number

    @ManyToOne(() => Event, (event) => event.enrollments)
    event: Event

    @ManyToOne(() => Player, (player) => player.enrollments)
    player: Player
}