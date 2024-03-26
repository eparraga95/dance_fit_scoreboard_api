import { Event } from "src/events/entities/event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'event_types'})
export class EventType {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    event_type_id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Event, (event) => event.event_type)
    events: Event[]

}