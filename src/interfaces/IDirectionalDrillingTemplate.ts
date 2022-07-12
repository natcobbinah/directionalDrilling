export interface InitalizeDrillingData {
    buildUpAngle: number;
    horizontalDisplacement: number;
    kickOffPoint: number;
    trueVerticalDepth: number;
}


export  interface DirectionDrillingClassTemplate{

    build_UpAngleFxn(): number;

    horizontal_DisplacementFxn(): number;

    total_AngleYFxn(): number;

    total_AngleXplusYFxn(): number;

    measured_DepthAtEndOfBuildSectionFxn(): number;

    trueVertical_DepthAtEndOfBuildFxn(): number;

    horizontal_DeviationAtEndOfBuildUpFxn(): number;
    
    total_MeasuredDepthFxn(): number;

    toDegreesFxn(radians: number): number;

    toRadiansFxn(degrees: number): number;
} 