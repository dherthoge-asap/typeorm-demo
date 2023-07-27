import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Order } from "./Order"

@Entity()
export class Timeslot {

    @PrimaryGeneratedColumn()
    timeslotId: number

    @Column()
    fromTime: string

    @Column()
    toTime: string

    @OneToOne(() => Order, (order) => order.timeslot, {
        cascade: true,
        onDelete: "CASCADE"
    })
    order: Order
}
