"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
var typeorm_1 = require("typeorm");
var Order_1 = require("./entity/Order");
var Location_1 = require("./entity/Location");
var Timeslot_1 = require("./entity/Timeslot");
exports.dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "test",
    entities: [Order_1.Order, Location_1.Location, Timeslot_1.Timeslot],
    logging: true,
    synchronize: true,
});
