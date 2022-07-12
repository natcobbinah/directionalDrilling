import { DirectionalDrilling } from "../classes/DirectionalDrilling";
import { InitalizeDrillingData } from "../interfaces/IDirectionalDrillingTemplate";

const inputData : InitalizeDrillingData = {
    buildUpAngle: 2,
    horizontalDisplacement: 3000,
    kickOffPoint: 2000,
    trueVerticalDepth: 10000
}

const ddrilling = new DirectionalDrilling(inputData);

describe("test suite for `directionalDrillingMethods`", () => {

    test('Radius', () => {
        expect(ddrilling.build_UpAngleFxn()).toBe(2864.7889756541163)
    })

    test('Angle X', () => {
        expect(ddrilling.horizontal_DisplacementFxn()).toBe(0.9682854378192228)
    })

    test('Angle Y', () => {
        expect(ddrilling.total_AngleYFxn()).toBe(20.980333796791758)
    })

    test('Angle (X+Y)', () => {
        expect(ddrilling.total_AngleXplusYFxn()).toBe(21.94861923461098)
    })

    test('Measured Depth At the End of Build', () => {
        expect(ddrilling.measured_DepthAtEndOfBuildSectionFxn()).toBe(3097.430961730549)
    })

    test('Horizontal Deviation at End of Build', () => {
        expect(ddrilling.horizontal_DeviationAtEndOfBuildUpFxn()).toBe(207.64158017340878)
    })

    test('Total Measured Depth', () => {
        expect(ddrilling.total_MeasuredDepthFxn()).toBe(10568.12478132156)
    })
});

