"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionalDrilling = void 0;
var constants_1 = require("../constants/constants");
var DirectionalDrilling = /** @class */ (function () {
    function DirectionalDrilling(args) {
        this._buildUpAngle = args.buildUpAngle;
        this._horizontalDisplacement = args.horizontalDisplacement;
        this._kickOffPoint = args.kickOffPoint;
        this._trueVerticalDepth = args.trueVerticalDepth;
    }
    Object.defineProperty(DirectionalDrilling.prototype, "buildUpAngle_Value", {
        get: function () {
            return this._buildUpAngle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DirectionalDrilling.prototype, "horizontalDisplacement_Value", {
        get: function () {
            return this._horizontalDisplacement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DirectionalDrilling.prototype, "kickOffPoint_Value", {
        get: function () {
            return this._kickOffPoint;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DirectionalDrilling.prototype, "trueVerticalDepth_Value", {
        get: function () {
            return this._trueVerticalDepth;
        },
        enumerable: false,
        configurable: true
    });
    DirectionalDrilling.prototype.build_UpAngleFxn = function () {
        return (constants_1.drillingConstants.valueOverbuildUp) /
            (this.buildUpAngle_Value * constants_1.drillingConstants.valuetimesbuildUp);
    };
    DirectionalDrilling.prototype.horizontal_DisplacementFxn = function () {
        var angleX = (this.horizontalDisplacement_Value - this.build_UpAngleFxn()) /
            (this._trueVerticalDepth - this._kickOffPoint);
        return this.toDegreesFxn(Math.atan(angleX));
    };
    DirectionalDrilling.prototype.total_AngleYFxn = function () {
        var angleY = this.build_UpAngleFxn() *
            Math.cos(this.toRadiansFxn(this.horizontal_DisplacementFxn())) /
            (this._trueVerticalDepth - this._kickOffPoint);
        return this.toDegreesFxn(Math.asin(angleY));
    };
    DirectionalDrilling.prototype.total_AngleXplusYFxn = function () {
        return this.total_AngleYFxn() + this.horizontal_DisplacementFxn();
    };
    DirectionalDrilling.prototype.measured_DepthAtEndOfBuildSectionFxn = function () {
        var setMeasuredDepth = this.total_AngleXplusYFxn() * constants_1.drillingConstants.valuetimesTotalAngleXplusY *
            constants_1.drillingConstants.PI * this.build_UpAngleFxn()
            /
                constants_1.drillingConstants.valueDividebyBuildUpAngle + this.kickOffPoint_Value;
        return setMeasuredDepth;
    };
    DirectionalDrilling.prototype.trueVertical_DepthAtEndOfBuildFxn = function () {
        var trueVerticalDepthCompute = this.build_UpAngleFxn() *
            Math.sin(this.toRadiansFxn(this.total_AngleXplusYFxn()) + this._kickOffPoint);
        return trueVerticalDepthCompute;
    };
    DirectionalDrilling.prototype.horizontal_DeviationAtEndOfBuildUpFxn = function () {
        var radiusValue = this.build_UpAngleFxn();
        var cosValue = radiusValue * Math.cos(this.toRadiansFxn(this.total_AngleXplusYFxn()));
        return (radiusValue - cosValue);
    };
    DirectionalDrilling.prototype.total_MeasuredDepthFxn = function () {
        var totalMeasuredDepth = this._trueVerticalDepth - this._kickOffPoint;
        var Rsina = this.build_UpAngleFxn() * Math.sin(this.toRadiansFxn(this.total_AngleXplusYFxn()));
        var cosA = Math.cos(this.toRadiansFxn(this.total_AngleXplusYFxn()));
        var getTrueVerticalDepth = this.measured_DepthAtEndOfBuildSectionFxn();
        var setFromArcToTarget = (totalMeasuredDepth - Rsina) / cosA;
        var totalDepth = setFromArcToTarget + getTrueVerticalDepth;
        return totalDepth;
    };
    DirectionalDrilling.prototype.toDegreesFxn = function (radiansVal) {
        return radiansVal * (constants_1.drillingConstants.maxRadianValue / constants_1.drillingConstants.PI);
    };
    DirectionalDrilling.prototype.toRadiansFxn = function (degreesVal) {
        return degreesVal * (constants_1.drillingConstants.PI / constants_1.drillingConstants.maxRadianValue);
    };
    DirectionalDrilling.prototype.computationalResult = function () {
        return "\n                Directional Drilling Compuational Results\n                -------------------------------------------\n                    Radius      => ".concat(this.build_UpAngleFxn(), "\n                    Angle X     => ").concat(this.horizontal_DisplacementFxn(), "\n                    Angle Y     => ").concat(this.total_AngleYFxn(), "\n                    Angle (X+Y) => ").concat(this.total_AngleXplusYFxn(), "\n                    Measured Depth At the End of Build => ").concat(this.measured_DepthAtEndOfBuildSectionFxn(), "\n                    Horizontal Deviation at End of Build => ").concat(this.horizontal_DeviationAtEndOfBuildUpFxn(), "\n                    Total Measured Depth => ").concat(this.total_MeasuredDepthFxn(), "\n                    ");
    };
    return DirectionalDrilling;
}());
exports.DirectionalDrilling = DirectionalDrilling;
var inputData = {
    buildUpAngle: 2,
    horizontalDisplacement: 3000,
    kickOffPoint: 2000,
    trueVerticalDepth: 10000
};
var ddrilling = new DirectionalDrilling(inputData);
console.log(ddrilling.computationalResult());
