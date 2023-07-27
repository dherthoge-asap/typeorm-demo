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
var OrderContact_1 = require("./entity/OrderContact");
var typeorm_1 = require("typeorm");
var util = require("util");
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
var orderContactRepo = app_data_source_1.dataSource.getRepository(OrderContact_1.OrderContact);
var timeslotRepo = app_data_source_1.dataSource.getRepository(Timeslot_1.Timeslot);
// create and setup express app
var app = express();
app.use(express.json()); // parse req.body as JSON
/* ROUTES
*/
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
                res.send(e_1.sqlMessage);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/location", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var locations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, locationRepo.find({
                    relations: req.body.relations
                })];
            case 1:
                locations = _a.sent();
                res.send(locations);
                return [2 /*return*/];
        }
    });
}); });
app.put("/location/:locationId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var location_2, newLocation, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, locationRepo.findOneBy({ locationId: parseInt(req.params.locationId) })];
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
                res.send(e_2.sqlMessage);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.delete("/location/:locationId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var location_3, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, locationRepo.findOneBy({ locationId: parseInt(req.params.locationId) })];
            case 1:
                location_3 = _a.sent();
                if (location_3 === null) {
                    res.send({ error: "invalid location ID" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, locationRepo.remove(location_3)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                res.send(e_3.sqlMessage);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Order
app.post("/order", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, locationId, orderDetails, orderContactsDetails, timeslotDetails, location_4, orderContacts, _i, orderContactsDetails_1, orderContactDetails, tmp, order, timeslot, _b, orderContacts_1, orderContact, result, e_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 8, , 9]);
                _a = req.body, locationId = _a.locationId, orderDetails = _a.orderDetails, orderContactsDetails = _a.orderContactsDetails, timeslotDetails = _a.timeslotDetails;
                return [4 /*yield*/, locationRepo.findOneBy({ locationId: locationId })];
            case 1:
                location_4 = _c.sent();
                if (location_4 === null) {
                    res.send({ error: "invalid location ID" });
                    return [2 /*return*/];
                }
                orderDetails.location = location_4;
                orderContacts = [];
                for (_i = 0, orderContactsDetails_1 = orderContactsDetails; _i < orderContactsDetails_1.length; _i++) {
                    orderContactDetails = orderContactsDetails_1[_i];
                    tmp = new OrderContact_1.OrderContact();
                    tmp = orderContactDetails;
                    orderContacts.push(tmp);
                }
                order = new Order_1.Order();
                timeslot = new Timeslot_1.Timeslot();
                order = orderDetails;
                timeslot = timeslotDetails;
                order.orderContacts = orderContacts;
                timeslot.order = order;
                console.log(orderContacts);
                _b = 0, orderContacts_1 = orderContacts;
                _c.label = 2;
            case 2:
                if (!(_b < orderContacts_1.length)) return [3 /*break*/, 5];
                orderContact = orderContacts_1[_b];
                if (orderContact.orders === undefined)
                    orderContact.orders = [];
                orderContact.orders.push(order);
                return [4 /*yield*/, orderContactRepo.save(orderContact)];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _b++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, timeslotRepo.save(timeslot)];
            case 6:
                timeslot = _c.sent();
                return [4 /*yield*/, orderRepo.findOne({
                        relations: {
                            timeslot: true,
                            location: true,
                            orderContacts: true
                        },
                        where: {
                            orderId: timeslot.order.orderId
                        }
                    })];
            case 7:
                result = _c.sent();
                return [2 /*return*/, res.send(result)];
            case 8:
                e_4 = _c.sent();
                res.send({ error: e_4.sqlMessage });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
app.get("/order", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orderRepo.find({
                    relations: req.body.relations
                })];
            case 1:
                orders = _a.sent();
                res.send(orders);
                return [2 /*return*/];
        }
    });
}); });
app.get("/order/:orderId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orderRepo.findOne({
                    relations: req.body.relations,
                    where: {
                        orderId: parseInt(req.params.orderId)
                    }
                })];
            case 1:
                order = _a.sent();
                if (order !== null)
                    res.send(order);
                else
                    res.send({ error: "invalid orderId" });
                return [2 /*return*/];
        }
    });
}); });
app.put("/order/:orderId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, isLocationChanging, location_5, _a, newOrder, result, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                return [4 /*yield*/, orderRepo.findOneBy({ orderId: parseInt(req.params.orderId) })];
            case 1:
                order = _b.sent();
                if (order === null)
                    return [2 /*return*/, res.send({ error: "invalid orderId" })];
                isLocationChanging = req.body.hasOwnProperty("locationId");
                if (!isLocationChanging) return [3 /*break*/, 3];
                return [4 /*yield*/, locationRepo.findOneBy({ locationId: req.body.locationId })];
            case 2:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = null;
                _b.label = 4;
            case 4:
                location_5 = _a;
                if (isLocationChanging && location_5 === null)
                    return [2 /*return*/, res.send({ error: "invalid locationId" })];
                newOrder = new Order_1.Order();
                newOrder = req.body.orderDetails;
                if (isLocationChanging)
                    newOrder.location = location_5;
                return [4 /*yield*/, orderRepo.merge(order, newOrder)];
            case 5:
                newOrder = _b.sent();
                return [4 /*yield*/, orderRepo.save(newOrder)];
            case 6:
                _b.sent();
                return [4 /*yield*/, orderRepo.findOne({
                        relations: req.body.relations,
                        where: {
                            orderId: newOrder.orderId
                        }
                    })];
            case 7:
                result = _b.sent();
                res.send(result);
                return [3 /*break*/, 9];
            case 8:
                e_5 = _b.sent();
                res.send(e_5.sqlMessage);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
app.delete("/order/:orderId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, result, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, orderRepo.findOne({
                        relations: {
                            timeslot: true
                        },
                        where: {
                            orderId: parseInt(req.params.orderId)
                        }
                    })];
            case 1:
                order = _a.sent();
                if (order === null)
                    return [2 /*return*/, res.send({ error: "invalid order ID" })
                        /* so cascading deletes delete children when their parent is deleted
                            but forsome reason the following show the opposite. If I delete
                            a Timeslots, the corresponding Order (Orders own Timeslots) is
                            not deleted
                
                            i.e.: const result = await orderRepo.remove(order)
                
                            the above line SHOULD delete the Order's timeslot, however it
                            doesn't😤
                
                            The line below this comment deletes the Timeslot and then deletes
                            the owning order. Why? Idk...
                        */
                        // const result = await orderRepo.remove(order)
                    ];
                return [4 /*yield*/, timeslotRepo.remove(order.timeslot)];
            case 2:
                result = _a.sent();
                console.log(result);
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                res.send(e_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// OrderContact
app.get("/ordercontact", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderContacts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orderContactRepo.find({
                    relations: req.body.relations
                })];
            case 1:
                orderContacts = _a.sent();
                res.send(orderContacts);
                return [2 /*return*/];
        }
    });
}); });
// Timeslot
app.get("/timeslot", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var timeslots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, timeslotRepo.find({
                    relations: req.body.relations
                })];
            case 1:
                timeslots = _a.sent();
                res.send(timeslots);
                return [2 /*return*/];
        }
    });
}); });
app.put("/timeslot/:timeslotId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var timeslot, newTimeslot, result, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, timeslotRepo.findOneBy({ timeslotId: parseInt(req.params.timeslotId) })];
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
                res.send(e_7.sqlMessage);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.delete("/timeslot/:timeslotId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var timeslot, result, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, timeslotRepo.findOneBy({ timeslotId: parseInt(req.params.timeslotId) })];
            case 1:
                timeslot = _a.sent();
                if (timeslot === null) {
                    res.send({ error: "invalid timeslot ID" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, timeslotRepo.remove(timeslot)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                e_8 = _a.sent();
                res.send(e_8.sqlMessage);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/* Fun-ctions I want to make (bad joke....)
*/
// path var "orderId" is the orderId (req.params)
// contacts to drop are given as query params (req.query)
app.put("/dropcontactfromorder/:orderId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, orderContacts, orderContactIds_1, _i, orderContacts_2, orderContact, orderResult, orderContactResult, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orderRepo.findOne({
                    relations: {
                        orderContacts: true
                    },
                    where: {
                        orderId: parseInt(req.params.orderId)
                    }
                })];
            case 1:
                order = _a.sent();
                if (order === null)
                    return [2 /*return*/, res.send({ error: "invalid orderId" })];
                return [4 /*yield*/, orderContactRepo.find({
                        relations: {
                            orders: true
                        },
                        where: {
                            orderContactId: (0, typeorm_1.In)(req.body.orderContactIds)
                        }
                    })];
            case 2:
                orderContacts = _a.sent();
                if (orderContacts.length === 0)
                    return [2 /*return*/, res.send({ error: "all orderContactIds were invalid" })];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                orderContactIds_1 = [];
                orderContactIds_1.push.apply(orderContactIds_1, orderContacts.map(function (oc) { return oc.orderContactId; }));
                order.orderContacts = order.orderContacts.filter(function (oc) {
                    return !orderContactIds_1.includes(oc.orderContactId);
                });
                for (_i = 0, orderContacts_2 = orderContacts; _i < orderContacts_2.length; _i++) {
                    orderContact = orderContacts_2[_i];
                    orderContact.orders = orderContact.orders.filter(function (o) { return o.orderId !== order.orderId; });
                }
                return [4 /*yield*/, orderRepo.save(order)];
            case 4:
                orderResult = _a.sent();
                return [4 /*yield*/, orderContactRepo.save(orderContacts)];
            case 5:
                orderContactResult = _a.sent();
                res.send({
                    order: orderResult,
                    orderContacts: orderContactResult
                });
                return [3 /*break*/, 7];
            case 6:
                e_9 = _a.sent();
                res.send(e_9);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// path var "orderId" is the orderId (req.params)
// contacts to add are given as query params (req.query)
app.put("/addcontacttoorder/:orderId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, orderContacts, orderContactIds, _i, orderContacts_3, oc, orderResult, orderContactResult, e_10;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, orderRepo.findOne({
                    relations: {
                        orderContacts: true
                    },
                    where: {
                        orderId: parseInt(req.params.orderId)
                    }
                })];
            case 1:
                order = _b.sent();
                if (order === null)
                    return [2 /*return*/, res.send({ error: "invalid orderId" })];
                return [4 /*yield*/, orderContactRepo.find({
                        relations: {
                            orders: true
                        },
                        where: {
                            orderContactId: (0, typeorm_1.In)(req.body.orderContactIds)
                        }
                    })];
            case 2:
                orderContacts = _b.sent();
                if (orderContacts.length === 0)
                    return [2 /*return*/, res.send({ error: "all orderContactIds were invalid" })];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 6, , 7]);
                orderContactIds = [];
                orderContactIds.push.apply(orderContactIds, orderContacts.map(function (oc) { return oc.orderContactId; }));
                (_a = order.orderContacts).push.apply(_a, orderContacts);
                for (_i = 0, orderContacts_3 = orderContacts; _i < orderContacts_3.length; _i++) {
                    oc = orderContacts_3[_i];
                    oc.orders.push(order);
                }
                return [4 /*yield*/, orderRepo.save(order)];
            case 4:
                orderResult = _b.sent();
                return [4 /*yield*/, orderContactRepo.save(orderContacts)];
            case 5:
                orderContactResult = _b.sent();
                res.send({
                    order: orderResult,
                    orderContacts: orderContactResult
                });
                return [3 /*break*/, 7];
            case 6:
                e_10 = _b.sent();
                res.send(e_10);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// start express server
app.listen(3000);
