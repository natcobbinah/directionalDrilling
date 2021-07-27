import { DirectionDrillingMethods } from "./directionalDrillingMethods";
export declare class DirectionalDrilling implements DirectionDrillingMethods {
    private valueOverbuildUp;
    private valuetimesbuildUp;
    private maxRadianValue;
    private valuetimesTotalAngleXplusY;
    private valueDividebyBuildUpAngle;
    private _buildUpAngle;
    private _horizontalDisplacement;
    private _kickOffPoint;
    private _trueVerticalDepth;
    toDegrees(radians: number): number;
    toRadians(degrees: number): number;
    build_UpAngle(value: number): number;
    horizontal_Displacement(value: number, kickoffPoint: number, trueVerticalDepth: number): number;
    total_AngleY(): number;
    total_AngleXplusY(): number;
    measured_DepthAtEndOfBuildSection(kickoffPoint: number): number;
    trueVertical_DepthAtEndOfBuild(KickOffPoint: number): number;
    horizontal_DeviationAtEndOfBuildUp(): number;
    total_MeasuredDepth(trueVerticalDepth: number, kickoffPoint: number): number;
}
