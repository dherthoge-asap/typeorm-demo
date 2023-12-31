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
exports.Timeslot = void 0;
var typeorm_1 = require("typeorm");
var Order_1 = require("./Order");
var Timeslot = exports.Timeslot = /** @class */ (function () {
    function Timeslot() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Timeslot.prototype, "timeslotId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Timeslot.prototype, "fromTime", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Timeslot.prototype, "toTime", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Order_1.Order; }, function (order) { return order.timeslot; }, {
            cascade: true,
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Order_1.Order)
    ], Timeslot.prototype, "order", void 0);
    Timeslot = __decorate([
        (0, typeorm_1.Entity)()
    ], Timeslot);
    return Timeslot;
}());
