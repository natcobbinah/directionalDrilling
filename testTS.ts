import { DirectionalDrilling } from "./src/classes/DirectionalDrilling";
import { InitalizeDrillingData } from "./src/interfaces/IDirectionalDrillingTemplate";

const inputData : InitalizeDrillingData = {
    buildUpAngle: 2,
    horizontalDisplacement: 3000,
    kickOffPoint: 2000,
    trueVerticalDepth: 10000
}

const drilling = new DirectionalDrilling(inputData);
console.log(drilling.computationalResult());
