"use strict";
exports.__esModule = true;
var directionalDrilling = /** @class */ (function () {
    function directionalDrilling() {
        this.valueOverbuildUp = 36000;
        this.valuetimesbuildUp = 6.283185307179586;
        this.maxRadianValue = 180;
        this.valuetimesTotalAngleXplusY = 2;
        this.valueDividebyBuildUpAngle = 360;
        this._buildUpAngle = 0;
        this._horizontalDisplacement = 0;
        this._kickOffPoint = 0;
        this._trueVerticalDepth = 0;
    }
    directionalDrilling.prototype.toDegrees = function (radians) {
        return radians * (this.maxRadianValue / Math.PI);
    };
    directionalDrilling.prototype.toRadians = function (degrees) {
        return degrees * (Math.PI / 180);
    };
    directionalDrilling.prototype.build_UpAngle = function (value) {
        this._buildUpAngle = value;
        var radius = (this.valueOverbuildUp / (value * this.valuetimesbuildUp));
        return radius;
    };
    directionalDrilling.prototype.horizontal_Displacement = function (value, kickoffPoint, trueVerticalDepth) {
        this._horizontalDisplacement = value;
        this._kickOffPoint = kickoffPoint;
        this._trueVerticalDepth = trueVerticalDepth;
        var angleX = (value - this.build_UpAngle(this._buildUpAngle)) /
            (this._trueVerticalDepth - this._kickOffPoint);
        return this.toDegrees(Math.atan(angleX));
    };
    directionalDrilling.prototype.total_AngleY = function () {
        var angleY = this.build_UpAngle(this._buildUpAngle) *
            Math.cos(this.toRadians(this.horizontal_Displacement(this._horizontalDisplacement, this._kickOffPoint, this._trueVerticalDepth)))
            /
                (this._trueVerticalDepth - this._kickOffPoint);
        return this.toDegrees(Math.asin(angleY));
    };
    directionalDrilling.prototype.total_AngleXplusY = function () {
        var sumofAngleXplusY = this.total_AngleY() +
            this.horizontal_Displacement(this._horizontalDisplacement, this._kickOffPoint, this._trueVerticalDepth);
        return sumofAngleXplusY;
    };
    directionalDrilling.prototype.measured_DepthAtEndOfBuildSection = function (kickoffPoint) {
        this._kickOffPoint = kickoffPoint;
        var setMeasuredDepth = this.total_AngleXplusY() * this.valuetimesTotalAngleXplusY * Math.PI *
            this.build_UpAngle(this._buildUpAngle)
            /
                this.valueDividebyBuildUpAngle + kickoffPoint;
        return setMeasuredDepth;
    };
    directionalDrilling.prototype.trueVertical_DepthAtEndOfBuild = function (KickOffPoint) {
        this._kickOffPoint = KickOffPoint;
        var trueVerticalDepthCompute = this.build_UpAngle(this._buildUpAngle) *
            Math.sin(this.toRadians(this.total_AngleXplusY())) + KickOffPoint;
        return trueVerticalDepthCompute;
    };
    directionalDrilling.prototype.horizontal_DeviationAtEndOfBuildUp = function () {
        var radiusValue = this.build_UpAngle(this._buildUpAngle);
        var cosValue = radiusValue * Math.cos(this.toRadians(this.total_AngleXplusY()));
        return (radiusValue - cosValue);
    };
    directionalDrilling.prototype.total_MeasuredDepth = function (trueVerticalDepth, kickoffPoint) {
        this._kickOffPoint = kickoffPoint;
        this._trueVerticalDepth = trueVerticalDepth;
        var totalMeasuredDepth = trueVerticalDepth - kickoffPoint;
        var Rsina = this.build_UpAngle(this._buildUpAngle) * Math.sin(this.toRadians(this.total_AngleXplusY()));
        var cosA = Math.cos(this.toRadians(this.total_AngleXplusY()));
        var getTrueVerticalDepth = this.measured_DepthAtEndOfBuildSection(this._kickOffPoint);
        var setFromArcToTarget = (totalMeasuredDepth - Rsina) / cosA;
        var totalDepth = setFromArcToTarget + getTrueVerticalDepth;
        return totalDepth;
    };
    return directionalDrilling;
}());
var drilling = new directionalDrilling();
console.log("Radius = " + drilling.build_UpAngle(2));
console.log("Angle X = " + drilling.horizontal_Displacement(3000, 2000, 10000));
console.log("Angle Y = " + drilling.total_AngleY());
console.log("Angle (X+Y) = " + drilling.total_AngleXplusY());
console.log("Measured Depth At the End of Build = " + drilling.measured_DepthAtEndOfBuildSection(2000));
console.log("Horizontal Deviation at End of Build = " + drilling.horizontal_DeviationAtEndOfBuildUp());
console.log("Total Measured Depth = " + drilling.total_MeasuredDepth(10000, 2000));
