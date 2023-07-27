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
exports.OrderContact = void 0;
var typeorm_1 = require("typeorm");
var Order_1 = require("./Order");
var OrderContact = exports.OrderContact = /** @class */ (function () {
    function OrderContact() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], OrderContact.prototype, "orderContactId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], OrderContact.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], OrderContact.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], OrderContact.prototype, "phoneNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], OrderContact.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Order_1.Order; }, function (order) { return order.orderContacts; }, {
        // cascade: ["remove", "update"]
        // eager: true
        }),
        __metadata("design:type", Array)
    ], OrderContact.prototype, "orders", void 0);
    OrderContact = __decorate([
        (0, typeorm_1.Entity)()
    ], OrderContact);
    return OrderContact;
}());
