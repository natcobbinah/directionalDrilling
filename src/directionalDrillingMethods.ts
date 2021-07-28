export  interface DirectionDrillingMethods{
    build_UpAngle(value: number): number;

    horizontal_Displacement(value: number, kickoffPoint: number, trueVerticalDepth:number): number;

    total_AngleY(): number;

    total_AngleXplusY(): number;

    measured_DepthAtEndOfBuildSection(kickoffPoint: number): number;

    trueVertical_DepthAtEndOfBuild(KickOffPoint: number): number;

    horizontal_DeviationAtEndOfBuildUp(): number;
    
    total_MeasuredDepth(trueVerticalDepth: number, kickoffPoint: number): number;

    toDegrees(radians: number): number;

    toRadians(degrees: number): number;
}