"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectionalDrilling_1 = require("./src/classes/DirectionalDrilling");
var inputData = {
    buildUpAngle: 2,
    horizontalDisplacement: 3000,
    kickOffPoint: 2000,
    trueVerticalDepth: 10000
};
var drilling = new DirectionalDrilling_1.DirectionalDrilling(inputData);
console.log(drilling.computationalResult());
