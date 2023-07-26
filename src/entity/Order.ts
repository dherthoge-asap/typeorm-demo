import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Location } from "./Location"
import { Timeslot } from "./Timeslot"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number

    @Column()
    status: "unscheduled" | "scheduled" | "complete"

    @Column()
    type: "morning" | "afternoon" | "night"

    @Column('text')
    note: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @ManyToOne(() => Location, (location) => location.orders, {
        onDelete: 'SET NULL',
        eager: true
    })
    location?: Location | null

    @OneToOne(() => Timeslot, (timeslot) => timeslot.order, { eager: true })
    @JoinColumn()
    timeslot?: Timeslot | null
}
