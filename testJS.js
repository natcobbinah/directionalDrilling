var ddrilling = require('./src/classes/DirectionalDrilling');

let data = {
    buildUpAngle: 2,
    horizontalDisplacement: 3000,
    kickOffPoint: 2000,
    trueVerticalDepth: 10000
}

var drilling = new ddrilling.DirectionalDrilling(data);
console.log(drilling.computationalResult())