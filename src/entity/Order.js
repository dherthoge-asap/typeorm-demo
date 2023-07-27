"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderTypes = void 0;
var typeorm_1 = require("typeorm");
var Location_1 = require("./Location");
var Timeslot_1 = require("./Timeslot");
var OrderContact_1 = require("./OrderContact");
var OrderTypes;
(function (OrderTypes) {
    OrderTypes["MORNING"] = "morning";
    OrderTypes["AFTERNOON"] = "afternoon";
    OrderTypes["NIGHT"] = "night";
})(OrderTypes || (exports.OrderTypes = OrderTypes = {}));
var Order = exports.Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Order.prototype, "orderId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Order.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: OrderTypes
        }),
        __metadata("design:type", String)
    ], Order.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Order.prototype, "note", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Location_1.Location; }, function (location) { return location.orders; }, { onDelete: 'SET NULL' }),
        __metadata("design:type", Location_1.Location)
    ], Order.prototype, "location", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Timeslot_1.Timeslot; }, function (timeslot) { return timeslot.order; }, {
            // eager: true
            onDelete: "CASCADE"
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Timeslot_1.Timeslot)
    ], Order.prototype, "timeslot", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return OrderContact_1.OrderContact; }, function (orderContact) { return orderContact.orders; }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], Order.prototype, "orderContacts", void 0);
    Order = __decorate([
        (0, typeorm_1.Entity)()
    ], Order);
    return Order;
}());
