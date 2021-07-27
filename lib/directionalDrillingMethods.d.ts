export interface directionDrillingMethods {
    build_UpAngle(value: Number): Number;
    horizontal_Displacement(value: Number, kickoffPoint: Number, trueVerticalDepth: Number): Number;
    kickOff_Point(value: Number): Number;
    true_VerticalDepth(value: Number): Number;
    total_AngleY(): Number;
    total_AngleXplusY(): Number;
    measured_DepthAtEndOfBuildSection(kickoffPoint: Number): Number;
    trueVertical_DepthAtEndOfBuild(KickOffPoint: Number): Number;
    horizontal_DeviationAtEndOfBuildUp(): Number;
    total_MeasuredDepth(trueVerticalDepth: Number, kickoffPoint: Number): Number;
    toDegrees(value: number): Number;
}
