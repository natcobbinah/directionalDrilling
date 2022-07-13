declare module "ddrilling" {
    
    export interface InitalizeDrillingData {
        buildUpAngle: number;
        horizontalDisplacement: number;
        kickOffPoint: number;
        trueVerticalDepth: number;
    }

    export interface DirectionDrillingClassTemplate {

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

    export class DirectionalDrilling implements DirectionDrillingClassTemplate {

        private _buildUpAngle;
        private _horizontalDisplacement;
        private _kickOffPoint;
        private _trueVerticalDepth;

        constructor(args: InitalizeDrillingData) {
            this._buildUpAngle = args.buildUpAngle;
            this._horizontalDisplacement = args.horizontalDisplacement;
            this._kickOffPoint = args.kickOffPoint;
            this._trueVerticalDepth = args.trueVerticalDepth;
        }

        get buildUpAngle_Value() {
            return this._buildUpAngle;
        }

        get horizontalDisplacement_Value() {
            return this._horizontalDisplacement;
        }

        get kickOffPoint_Value() {
            return this._kickOffPoint;
        }

        get trueVerticalDepth_Value() {
            return this._trueVerticalDepth;
        }

        build_UpAngleFxn(): number {
            return (drillingConstants.valueOverbuildUp) /
                (this.buildUpAngle_Value * drillingConstants.valuetimesbuildUp);
        }

        horizontal_DisplacementFxn(): number {
            const angleX = (this.horizontalDisplacement_Value - this.build_UpAngleFxn()) /
                (this._trueVerticalDepth - this._kickOffPoint);
            return this.toDegreesFxn(Math.atan(angleX));
        }

        total_AngleYFxn(): number {
            const angleY = this.build_UpAngleFxn() *
                Math.cos(this.toRadiansFxn(
                    this.horizontal_DisplacementFxn()
                )) /
                (this._trueVerticalDepth - this._kickOffPoint);
            return this.toDegreesFxn(Math.asin(angleY));
        }

        total_AngleXplusYFxn(): number {
            return this.total_AngleYFxn() + this.horizontal_DisplacementFxn();
        }

        measured_DepthAtEndOfBuildSectionFxn(): number {
            const setMeasuredDepth = this.total_AngleXplusYFxn() * drillingConstants.valuetimesTotalAngleXplusY *
                drillingConstants.PI * this.build_UpAngleFxn()
                /
                drillingConstants.valueDividebyBuildUpAngle + this.kickOffPoint_Value;
            return setMeasuredDepth;
        }

        trueVertical_DepthAtEndOfBuildFxn(): number {
            const trueVerticalDepthCompute = this.build_UpAngleFxn() *
                Math.sin(this.toRadiansFxn(this.total_AngleXplusYFxn()) + this._kickOffPoint);
            return trueVerticalDepthCompute;
        }

        horizontal_DeviationAtEndOfBuildUpFxn(): number {
            const radiusValue = this.build_UpAngleFxn();
            const cosValue = radiusValue * Math.cos(this.toRadiansFxn(this.total_AngleXplusYFxn()));
            return (radiusValue - cosValue);
        }

        total_MeasuredDepthFxn(): number {
            const totalMeasuredDepth = this._trueVerticalDepth - this._kickOffPoint;
            const Rsina = this.build_UpAngleFxn() * Math.sin(this.toRadiansFxn(this.total_AngleXplusYFxn()));
            const cosA = Math.cos(this.toRadiansFxn(this.total_AngleXplusYFxn()));
            const getTrueVerticalDepth = this.measured_DepthAtEndOfBuildSectionFxn();
            const setFromArcToTarget = (totalMeasuredDepth - Rsina) / cosA;
            const totalDepth = setFromArcToTarget + getTrueVerticalDepth;
            return totalDepth;
        }

        toDegreesFxn(radiansVal: number): number {
            return radiansVal * (drillingConstants.maxRadianValue / drillingConstants.PI);
        }

        toRadiansFxn(degreesVal: number): number {
            return degreesVal * (drillingConstants.PI / drillingConstants.maxRadianValue);
        }

        computationalResult(): string {
            return `
                Directional Drilling Compuational Results
                -------------------------------------------
                    Radius      => ${this.build_UpAngleFxn()}
                    Angle X     => ${this.horizontal_DisplacementFxn()}
                    Angle Y     => ${this.total_AngleYFxn()}
                    Angle (X+Y) => ${this.total_AngleXplusYFxn()}
                    Measured Depth At the End of Build => ${this.measured_DepthAtEndOfBuildSectionFxn()}
                    Horizontal Deviation at End of Build => ${this.horizontal_DeviationAtEndOfBuildUpFxn()}
                    Total Measured Depth => ${this.total_MeasuredDepthFxn()}
                    `;
        }
    }

}