import { DataSource } from "typeorm"
import { Order } from "./entity/Order"
import { Location } from "./entity/Location"
import { Timeslot } from "./entity/Timeslot"
import { OrderContact } from "./entity/OrderContact"

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "test",
    entities: [Location, Order, OrderContact, Timeslot],
    logging: true,
    synchronize: true,
})
