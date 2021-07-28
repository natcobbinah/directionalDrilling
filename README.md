# directionalDrilling
npm package for directional drilling problems

Methods available include the following:

    build_UpAngle(value: number): number;

    horizontal_Displacement(value: number, kickoffPoint: number, trueVerticalDepth:number): number;

    total_AngleY(): number;

    total_AngleXplusY(): number;

    measured_DepthAtEndOfBuildSection(kickoffPoint: number): number;

    trueVertical_DepthAtEndOfBuild(KickOffPoint: number): number;

    horizontal_DeviationAtEndOfBuildUp(): number;
    
    total_MeasuredDepth(trueVerticalDepth: number, kickoffPoint: number): number;
    
#using Classes and Methods
import { DirectionalDrilling } from "ddrilling";

const drilling = new DirectionalDrilling();

//To compute the radius
console.log("Radius" + drilling.build_UpAngle(2));

//To compute Angle X
console.log("Angle X = " + drilling.horizontal_Displacement(3000, 2000, 10000));

//To compute Angle Y
console.log("Angle Y = " + drilling.total_AngleY());

//To compute Angle X + Y
console.log("Angle (X+Y) = " + drilling.total_AngleXplusY());

//To compute measured Depth at the end of Build Up
console.log("Measured Depth At the End of Build = " + drilling.measured_DepthAtEndOfBuildSection(2000));

//To compute Horizontal deviation at the end of Build
console.log("Horizontal Deviation at End of Build = " + drilling.horizontal_DeviationAtEndOfBuildUp());

//To compute Total measured Depth
console.log("Total Measured Depth = " + drilling.total_MeasuredDepth(10000, 2000));

