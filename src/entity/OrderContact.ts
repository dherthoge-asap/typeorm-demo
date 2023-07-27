import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Order } from "./Order"

@Entity()
export class OrderContact {
    @PrimaryGeneratedColumn()
    orderContactId: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phoneNumber: string

    @Column()
    email: string

    @ManyToMany(() => Order, (order) => order.orderContacts, {
        // cascade: true
        // eager: true
    })
    orders: Order[]
}
