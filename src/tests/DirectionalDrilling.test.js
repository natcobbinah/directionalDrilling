"use strict";
exports.__esModule = true;
var index_1 = require("../index");
var ddrilling = new index_1.DirectionalDrilling();
test('Radius', function () {
    expect(ddrilling.build_UpAngle(2)).toBe(2864.7889756541163);
});
test('Angle X', function () {
    expect(ddrilling.horizontal_Displacement(3000, 2000, 10000)).toBe(0.9682854378192228);
});
test('Angle Y', function () {
    expect(ddrilling.total_AngleY()).toBe(20.980333796791758);
});
test('Angle (X+Y)', function () {
    expect(ddrilling.total_AngleXplusY()).toBe(21.94861923461098);
});
test('Measured Depth At the End of Build', function () {
    expect(ddrilling.measured_DepthAtEndOfBuildSection(2000)).toBe(3097.430961730549);
});
test('Horizontal Deviation at End of Build', function () {
    expect(ddrilling.horizontal_DeviationAtEndOfBuildUp()).toBe(207.64158017340878);
});
test('Total Measured Depth', function () {
    expect(ddrilling.total_MeasuredDepth(10000, 2000)).toBe(10568.12478132156);
});
