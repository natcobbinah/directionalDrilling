"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var directionalDrilling = /** @class */ (function () {
    function directionalDrilling() {
        this.valueOverbuildUp = 36000;
        this.valuetimesbuildUp = 6.283185307179586;
        this.maxRadianValue = 180;
    }
    directionalDrilling.prototype.toDegrees = function (value) {
        return value * (this.maxRadianValue / Math.PI);
    };
    directionalDrilling.prototype.build_UpAngle = function (value) {
        var radius = (this.valueOverbuildUp / (value * this.valuetimesbuildUp));
        return radius;
    };
    directionalDrilling.prototype.horizontal_Displacement = function (value, kickoffPoint, trueVerticalDepth) {
        throw new Error("Method not implemented.");
    };
    directionalDrilling.prototype.kickOff_Point = function (value) {
        throw new Error("Method not implemented.");
    };
    directionalDrilling.prototype.true_VerticalDepth = function (value) {
        throw new Error("Method not implemented.");
    };
    directionalDrilling.prototype.total_AngleY = function () {
        throw new Error("Method not implemented.");
    };
    directionalDrilling.prototype.total_AngleXplusY = function () {
        throw new Error("Method not implemented.");
    };
    directionalDrilling.prototype.measured_DepthAtEndOfBuildSection = function (kickoffPoint) {
        throw new Error("Method not implemented.");
    };
    directionalDrilling.prototype.trueVertical_DepthAtEndOfBuild = function (KickOffPoint) {
        throw new Error("Method not implemented.");
    };
    directionalDrilling.prototype.horizontal_DeviationAtEndOfBuildUp = function () {
        throw new Error("Method not implemented.");
    };
    directionalDrilling.prototype.total_MeasuredDepth = function (trueVerticalDepth, kickoffPoint) {
        throw new Error("Method not implemented.");
    };
    return directionalDrilling;
}());
var drilling = new directionalDrilling();
console.log(drilling.build_UpAngle(2));
