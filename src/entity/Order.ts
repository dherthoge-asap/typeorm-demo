import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Location } from "./Location"
import { Timeslot } from "./Timeslot"
import { OrderContact } from "./OrderContact"

export enum OrderTypes {
    MORNING = "morning",
    AFTERNOON = "afternoon",
    NIGHT = "night"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number

    @Column()
    status: string

    @Column({
        type: "enum",
        enum: OrderTypes
    })
    type: OrderTypes

    @Column('text')
    note: string

    @ManyToOne(() => Location, (location) => location.orders, { onDelete: 'SET NULL' })
    location?: Location | null

    @OneToOne(() => Timeslot, (timeslot) => timeslot.order, {// @OneToOne("Timeslot", "order", {
        // eager: true
        onDelete: "CASCADE"
    })
    @JoinColumn()
    timeslot?: Timeslot | null

    @ManyToMany(() => OrderContact, (orderContact) => orderContact.orders)
    @JoinTable()
    orderContacts: OrderContact[]
}
