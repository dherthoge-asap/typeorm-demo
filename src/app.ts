import * as express from "express"
import { Request, Response } from "express"
import { Location } from "./entity/Location"
import { Order } from "./entity/Order"
import { Timeslot } from "./entity/Timeslot"
import { dataSource } from "./app-data-source"
import { OrderContact } from "./entity/OrderContact"
import { In } from "typeorm"
const util = require("util")

// establish database connection and store repositories
dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const locationRepo = dataSource.getRepository(Location)
const orderRepo = dataSource.getRepository(Order)
const orderContactRepo = dataSource.getRepository(OrderContact)
const timeslotRepo = dataSource.getRepository(Timeslot)

// create and setup express app
const app = express()
app.use(express.json()) // parse req.body as JSON



/* ROUTES
*/

// Location
app.post("/location", async (req: Request, res: Response) => {
    try {
        const location = await locationRepo.create(req.body)
        const result = await locationRepo.save(location)
        res.send(result)
    } catch (e) {
        res.send(e.sqlMessage)
    }
})

app.get("/location", async (req: Request, res: Response) => {
    const locations = await locationRepo.find({
        relations: req.body.relations
    })
    res.send(locations)
})

app.put("/location/:locationId", async (req: Request, res: Response) => {
    try {
        const location = await locationRepo.findOneBy({ locationId: parseInt(req.params.locationId) })
        const newLocation = await locationRepo.merge(location, req.body)
        const result = await locationRepo.save(newLocation)
        res.send(result)
    } catch (e) {
        res.send(e.sqlMessage)
    }
})

app.delete("/location/:locationId", async (req: Request, res: Response) => {
    try {
        const location = await locationRepo.findOneBy({ locationId: parseInt(req.params.locationId)})
        if (location === null) {
            res.send({ error: "invalid location ID" })
            return
        }
        const result = await locationRepo.remove(location)
        res.send(result)
    } catch (e) {
        res.send(e.sqlMessage)
    }
})


// Order
app.post("/order", async (req: Request, res: Response) => {
    try{
        const { locationId, orderDetails, orderContactsDetails, timeslotDetails } = req.body

        // set the Location for the order
        const location = await locationRepo.findOneBy({locationId: locationId})
        if (location === null) {
            res.send({ error: "invalid location ID" })
            return
        }
        orderDetails.location = location

        let orderContacts: OrderContact[] = []
        for (let orderContactDetails of orderContactsDetails) {
            let tmp = new OrderContact()
            tmp = orderContactDetails
            orderContacts.push(tmp)
        }

        let order = new Order()
        let timeslot = new Timeslot()
        order = orderDetails
        timeslot = timeslotDetails
        order.orderContacts = orderContacts
        timeslot.order = order
        console.log(orderContacts)

        for (let orderContact of orderContacts) {
            if (orderContact.orders === undefined) orderContact.orders = []
            orderContact.orders.push(order)
            await orderContactRepo.save(orderContact)
        }
        timeslot = await timeslotRepo.save(timeslot)
        const result = await orderRepo.findOne({
            relations: {
                timeslot: true,
                location: true,
                orderContacts: true
            },
            where: {
            orderId: timeslot.order.orderId
        }})
        return res.send(result)
    } catch (e) {
        res.send({error: e.sqlMessage})
    }
})

app.get("/order", async (req: Request, res: Response) => {
    const orders = await orderRepo.find({
        relations: req.body.relations
    })
    res.send(orders)
})

app.get("/order/:orderId", async (req: Request, res: Response) => {
    const order = await orderRepo.findOne({
        relations: req.body.relations,
        where: {
            orderId: parseInt(req.params.orderId)
        }
    })
    if (order !== null) res.send(order)
    else res.send({ error: "invalid orderId" })
})

app.put("/order/:orderId", async (req: Request, res: Response) => {
    try {
        const order = await orderRepo.findOneBy({ orderId: parseInt(req.params.orderId) })
        if (order === null) return res.send({ error: "invalid orderId" })
        const isLocationChanging = req.body.hasOwnProperty("locationId")
        const location = isLocationChanging ? await locationRepo.findOneBy({ locationId: req.body.locationId})
                                                : null
        if (isLocationChanging && location === null)
            return res.send({ error: "invalid locationId" })

        let newOrder = new Order()
        newOrder = req.body.orderDetails
        if (isLocationChanging)
            newOrder.location = location
        newOrder = await orderRepo.merge(order, newOrder)

        await orderRepo.save(newOrder)
        const result = await orderRepo.findOne({
            relations: req.body.relations,
            where: {
                orderId: newOrder.orderId
            }
        })
        res.send(result)
    } catch (e) {
        res.send(e.sqlMessage)
    }
})

app.delete("/order/:orderId", async (req: Request, res: Response) => {
    try {
        const order = await orderRepo.findOne({
            relations: {
                timeslot: true
            },
            where: {
                orderId: parseInt(req.params.orderId)
            }
        })
        if (order === null)
            return res.send({ error: "invalid order ID" })

        /* so cascading deletes delete children when their parent is deleted
            but forsome reason the following show the opposite. If I delete
            a Timeslots, the corresponding Order (Orders own Timeslots) is
            not deleted

            i.e.: const result = await orderRepo.remove(order)

            The above line SHOULD delete the Order's timeslot, however it
            doesn't😤

            The line below this comment deletes the Timeslot and then deletes
            the owning order. Why? Idk...
        */
        const result = await timeslotRepo.remove(order.timeslot)
        console.log(result)
        res.send(result)
    } catch (e) {
        res.send(e)
    }
})


// OrderContact
app.get("/ordercontact", async (req: Request, res: Response) => {
    const orderContacts = await orderContactRepo.find({
        relations: req.body.relations
    })
    res.send(orderContacts)
})


// Timeslot
app.get("/timeslot", async (req: Request, res: Response) => {
    const timeslots = await timeslotRepo.find({
        relations: req.body.relations
    })
    res.send(timeslots)
})

app.put("/timeslot/:timeslotId", async (req: Request, res: Response) => {
    try {
        const timeslot = await timeslotRepo.findOneBy({ timeslotId: parseInt(req.params.timeslotId) })
        const newTimeslot = await timeslotRepo.merge(timeslot, req.body)
        const result = await timeslotRepo.save(newTimeslot)
        res.send(result)
    } catch (e) {
        res.send(e.sqlMessage)
    }
})

app.delete("/timeslot/:timeslotId", async (req: Request, res: Response) => {
    try {
        const timeslot = await timeslotRepo.findOneBy({ timeslotId: parseInt(req.params.timeslotId)})
        if (timeslot === null) {
            res.send({ error: "invalid timeslot ID" })
            return
        }
        const result = await timeslotRepo.remove(timeslot)
        res.send(result)
    } catch (e) {
        res.send(e.sqlMessage)
    }
})



/* Fun-ctions I want to make (bad joke....)
*/

// path var "orderId" is the orderId (req.params)
// contacts to drop are given as query params (req.query)
app.put("/dropcontactfromorder/:orderId", async (req: Request, res: Response) => {
    const order = await orderRepo.findOne({
        relations: {
            orderContacts: true
        },
        where: {
            orderId: parseInt(req.params.orderId)
        }
    })
    if (order === null)
        return res.send({ error: "invalid orderId" })

    const orderContacts = await orderContactRepo.find({
        relations: {
            orders: true
        },
        where: {
            orderContactId: In(req.body.orderContactIds)
        }
    })
    if (orderContacts.length === 0)
        return res.send({ error: "all orderContactIds were invalid" })

    try {
        const orderContactIds = []
        orderContactIds.push(...orderContacts.map(oc => oc.orderContactId))

        order.orderContacts = order.orderContacts.filter(oc => {
            return !orderContactIds.includes(oc.orderContactId)
        })

        for (let orderContact of orderContacts)
            orderContact.orders = orderContact.orders.filter(
                o => o.orderId !== order.orderId
            )

        const orderResult = await orderRepo.save(order)
        const orderContactResult = await orderContactRepo.save(orderContacts)

        res.send({
            order: orderResult,
            orderContacts: orderContactResult
        })
    } catch (e) {
        res.send(e)
    }
})

// path var "orderId" is the orderId (req.params)
// contacts to add are given as query params (req.query)
app.put("/addcontacttoorder/:orderId", async (req: Request, res: Response) => {
    const order = await orderRepo.findOne({
        relations: {
            orderContacts: true
        },
        where: {
            orderId: parseInt(req.params.orderId)
        }
    })
    if (order === null)
        return res.send({ error: "invalid orderId" })

    const orderContacts = await orderContactRepo.find({
        relations: {
            orders: true
        },
        where: {
            orderContactId: In(req.body.orderContactIds)
        }
    })
    if (orderContacts.length === 0)
        return res.send({ error: "all orderContactIds were invalid" })

    try {
        const orderContactIds = []
        orderContactIds.push(...orderContacts.map(oc => oc.orderContactId))

        order.orderContacts.push(...orderContacts)

        for (let oc of orderContacts)
            oc.orders.push(order)

        const orderResult = await orderRepo.save(order)
        const orderContactResult = await orderContactRepo.save(orderContacts)

        res.send({
            order: orderResult,
            orderContacts: orderContactResult
        })
    } catch (e) {
        res.send(e)
    }
})


// start express server
app.listen(3000)
