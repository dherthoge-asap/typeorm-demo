import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from "typeorm"
import { Order } from "./Order"

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    locationId: number

    @Column()
    addressStreet: string

    @Column()
    addressCity: string

    @Column()
    addressState: string

    @Column()
    addressZip: number

    @Column()
    name: string

    @OneToMany(() => Order, (order) => order.location)
    orders?: Order[]
}
