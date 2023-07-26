import * as express from "express"
import bodyParser = require("body-parser")
import { Request, Response } from "express"
import { Location } from "./entity/Location"
import { Order } from "./entity/Order"
import { Timeslot } from "./entity/Timeslot"
import { dataSource } from "./app-data-source"

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
const timeslotRepo = dataSource.getRepository(Timeslot)

// create and setup express app
const app = express()
app.use(express.json()) // parse req.body as JSON



// ROUTES
//

// Location
app.post("/location", async (req: Request, res: Response) => {
    try {
        const location = await locationRepo.create(req.body)
        const result = await locationRepo.save(location)
        res.send(result)
    } catch (e) {
        res.send({ error: "did not provide necessary information"})
    }
})

app.get("/location", async (req: Request, res: Response) => {
    const locations = await locationRepo.find()
    res.send(locations)
})

app.put("/location/:id", async (req: Request, res: Response) => {
    try {
        const location = await locationRepo.findOneBy({ locationId: parseInt(req.params.id) })
        const newLocation = await locationRepo.merge(location, req.body)
        const result = await locationRepo.save(newLocation)
        res.send(result)
    } catch (e) {
        res.send({ error: "invalid location ID or location information"})
    }
})

app.delete("/location/:id", async (req: Request, res: Response) => {
    try {
        const location = await locationRepo.findOneBy({ locationId: parseInt(req.params.id)})
        const result = await locationRepo.remove(location)
        res.send(result)
    } catch (e) {
        res.send({ error: "invalid location ID"})
    }
})


// Order
app.post("/order", async (req: Request, res: Response) => {
    try{
        const { locationId, orderDetails, timeslotDetails } = req.body

        // set the Location for the order
        const location = await locationRepo.findOneBy({locationId: locationId})
        orderDetails.location = location

        let order = new Order()
        let timeslot = new Timeslot
        order = orderDetails
        timeslot = timeslotDetails
        timeslot.order = order

        const result = await timeslotRepo.save(timeslot)
        res.send(result.order)
    } catch (e) {
        res.send({ error: "did not provide an existing location ID or necessary information"})
    }
})

app.get("/order", async (req: Request, res: Response) => {
    const orders = await orderRepo.find({
        relations: {
            timeslot: true
        }
    })
    res.send(orders)
})

app.get("/order/:id", async (req: Request, res: Response) => {
    const order = await orderRepo.findOneBy({
        orderId: parseInt(req.params.id)
    })
    res.send(order)
})

app.put("/order/:id", async (req: Request, res: Response) => {
    try {
        const order = await orderRepo.findOneBy({ orderId: parseInt(req.params.id) })
        const location = await locationRepo.findOneBy({ locationId: req.body.locationId})

        let newOrder = new Order()
        newOrder = req.body.orderDetails
        newOrder.location = location
        newOrder = await orderRepo.merge(order, newOrder)

        const result = await orderRepo.save(newOrder)
        res.send(result)
    } catch (e) {
        res.send({ error: "did not provide existing ID or necessary information" })
    }
})

app.delete("/order/:id", async (req: Request, res: Response) => {
    try {
        const order = await orderRepo.findOneBy({ orderId: parseInt(req.params.id)})
        const result = await orderRepo.remove(order)
        res.send(result)
    } catch (e) {
        res.send({ error: "invalid order ID" })
    }
})


// Timeslot
app.get("/timeslot", async (req: Request, res: Response) => {
    const timeslots = await timeslotRepo.find({
        relations: {
            order: true
        }
    })
    res.send(timeslots)
})

app.put("/timeslot/:id", async (req: Request, res: Response) => {
    try {
        const timeslot = await timeslotRepo.findOneBy({ timeslotId: parseInt(req.params.id) })
        const newTimeslot = await timeslotRepo.merge(timeslot, req.body)
        const result = await timeslotRepo.save(newTimeslot)
        res.send(result)
    } catch (e) {
        res.send({ error: "did not provide existing ID or neccessary information"})
    }
})

app.delete("/timeslot/:id", async (req: Request, res: Response) => {
    try {
        const timeslot = await timeslotRepo.findOneBy({ timeslotId: parseInt(req.params.id)})
        const result = await timeslotRepo.remove(timeslot)
        res.send(result)
    } catch (e) {
        res.send({ error: "invalid timeslot ID" })
    }
})



// start express server
app.listen(3000)
