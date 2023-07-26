"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Location_1 = require("./entity/Location");
var Order_1 = require("./entity/Order");
var Timeslot_1 = require("./entity/Timeslot");
var app_data_source_1 = require("./app-data-source");
// establish database connection and store repositories
app_data_source_1.dataSource
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err);
});
var locationRepo = app_data_source_1.dataSource.getRepository(Location_1.Location);
var orderRepo = app_data_source_1.dataSource.getRepository(Order_1.Order);
var timeslotRepo = app_data_source_1.dataSource.getRepository(Timeslot_1.Timeslot);
// create and setup express app
var app = express();
app.use(express.json()); // parse req.body as JSON
// ROUTES
//
// Location
app.post("/location", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var location_1, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, locationRepo.create(req.body)];
            case 1:
                location_1 = _a.sent();
                return [4 /*yield*/, locationRepo.save(location_1)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                res.send({ error: "did not provide necessary information" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/location", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var locations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, locationRepo.find()];
            case 1:
                locations = _a.sent();
                res.send(locations);
                return [2 /*return*/];
        }
    });
}); });
app.put("/location/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var location_2, newLocation, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, locationRepo.findOneBy({ locationId: parseInt(req.params.id) })];
            case 1:
                location_2 = _a.sent();
                return [4 /*yield*/, locationRepo.merge(location_2, req.body)];
            case 2:
                newLocation = _a.sent();
                return [4 /*yield*/, locationRepo.save(newLocation)];
            case 3:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                res.send({ error: "invalid location ID or location information" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.delete("/location/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var location_3, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, locationRepo.findOneBy({ locationId: parseInt(req.params.id) })];
            case 1:
                location_3 = _a.sent();
                return [4 /*yield*/, locationRepo.remove(location_3)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                res.send({ error: "invalid location ID" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Order
app.post("/order", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, locationId, orderDetails, timeslotDetails, location_4, order, timeslot, result, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, locationId = _a.locationId, orderDetails = _a.orderDetails, timeslotDetails = _a.timeslotDetails;
                return [4 /*yield*/, locationRepo.findOneBy({ locationId: locationId })];
            case 1:
                location_4 = _b.sent();
                orderDetails.location = location_4;
                order = new Order_1.Order();
                timeslot = new Timeslot_1.Timeslot;
                order = orderDetails;
                timeslot = timeslotDetails;
                timeslot.order = order;
                return [4 /*yield*/, timeslotRepo.save(timeslot)];
            case 2:
                result = _b.sent();
                res.send(result.order);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _b.sent();
                res.send({ error: "did not provide an existing location ID or necessary information" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/order", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orderRepo.find({
                    relations: {
                        timeslot: true
                    }
                })];
            case 1:
                orders = _a.sent();
                res.send(orders);
                return [2 /*return*/];
        }
    });
}); });
app.get("/order/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orderRepo.findOneBy({
                    orderId: parseInt(req.params.id)
                })];
            case 1:
                order = _a.sent();
                res.send(order);
                return [2 /*return*/];
        }
    });
}); });
app.put("/order/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, location_5, newOrder, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, orderRepo.findOneBy({ orderId: parseInt(req.params.id) })];
            case 1:
                order = _a.sent();
                return [4 /*yield*/, locationRepo.findOneBy({ locationId: req.body.locationId })];
            case 2:
                location_5 = _a.sent();
                newOrder = new Order_1.Order();
                newOrder = req.body.orderDetails;
                newOrder.location = location_5;
                return [4 /*yield*/, orderRepo.merge(order, newOrder)];
            case 3:
                newOrder = _a.sent();
                return [4 /*yield*/, orderRepo.save(newOrder)];
            case 4:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 6];
            case 5:
                e_5 = _a.sent();
                res.send({ error: "did not provide existing ID or necessary information" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.delete("/order/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, result, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, orderRepo.findOneBy({ orderId: parseInt(req.params.id) })];
            case 1:
                order = _a.sent();
                return [4 /*yield*/, orderRepo.remove(order)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                res.send({ error: "invalid order ID" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Timeslot
app.get("/timeslot", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var timeslots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, timeslotRepo.find({
                    relations: {
                        order: true
                    }
                })];
            case 1:
                timeslots = _a.sent();
                res.send(timeslots);
                return [2 /*return*/];
        }
    });
}); });
app.put("/timeslot/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var timeslot, newTimeslot, result, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, timeslotRepo.findOneBy({ timeslotId: parseInt(req.params.id) })];
            case 1:
                timeslot = _a.sent();
                return [4 /*yield*/, timeslotRepo.merge(timeslot, req.body)];
            case 2:
                newTimeslot = _a.sent();
                return [4 /*yield*/, timeslotRepo.save(newTimeslot)];
            case 3:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 5];
            case 4:
                e_7 = _a.sent();
                res.send({ error: "did not provide existing ID or neccessary information" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.delete("/timeslot/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var timeslot, result, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, timeslotRepo.findOneBy({ timeslotId: parseInt(req.params.id) })];
            case 1:
                timeslot = _a.sent();
                return [4 /*yield*/, timeslotRepo.remove(timeslot)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                e_8 = _a.sent();
                res.send({ error: "invalid timeslot ID" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// register routes
// app.get("/user", async (req: Request, res: Response) => {
//     const user = await dataSource.getRepository(User).find()
//     res.json(user)
// })
// app.get("/user/:id", async (req: Request, res: Response) => {
//     const results = await dataSource.getRepository(User).findOneBy({
//         id: parseInt(req.params.id)
//     })
//     res.send(results)
// })
// app.post("/user", async (req: Request, res: Response) => {
//     const user = await dataSource.getRepository(User).create(req.body)
//     const results = await dataSource.getRepository(User).save(user)
//     res.send(results)
// })
// app.put("/user/:id", async (req: Request, res: Response) => {
//     const user = await dataSource.getRepository(User).findOneBy({
//         id: parseInt(req.params.id)
//     })
//     dataSource.getRepository(User).merge(user, req.body)
//     const results = await dataSource.getRepository(User).save(user)
//     res.send(results)
// })
// app.delete("/user/:id", async (req: Request, res: Response) => {
//     const results = await dataSource.getRepository(User).delete(req.params.id)
//     res.send(results)
// })
// start express server
app.listen(3000);
