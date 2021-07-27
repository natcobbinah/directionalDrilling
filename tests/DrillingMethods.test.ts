import { DirectionalDrilling } from "../DirectionalDrilling";

const ddrilling = new DirectionalDrilling();

test('Radius', () => {
    expect(ddrilling.build_UpAngle(2)).toBe(2864.7889756541163)
})

test('Angle X', () => {
    expect(ddrilling.horizontal_Displacement(3000, 2000, 10000)).toBe(0.9682854378192228)
})

test('Angle Y', () => {
    expect(ddrilling.total_AngleY()).toBe(20.980333796791758)
})

test('Angle (X+Y)', () => {
    expect(ddrilling.total_AngleXplusY()).toBe(21.94861923461098)
})

test('Measured Depth At the End of Build', () => {
    expect(ddrilling.measured_DepthAtEndOfBuildSection(2000)).toBe(3097.430961730549)
})

test('Horizontal Deviation at End of Build', () => {
    expect(ddrilling.horizontal_DeviationAtEndOfBuildUp()).toBe(207.64158017340878)
})

test('Total Measured Depth', () => {
    expect(ddrilling.total_MeasuredDepth(10000,2000)).toBe(10568.12478132156)
})