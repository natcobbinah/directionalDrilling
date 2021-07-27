import { directionDrillingMethods } from "./directionalDrillingMethods";

class directionalDrilling implements directionDrillingMethods {

  private valueOverbuildUp = 36000;
  private valuetimesbuildUp = 6.283185307179586;
  private maxRadianValue = 180;
  private valuetimesTotalAngleXplusY = 2;
  private valueDividebyBuildUpAngle = 360;
  
  private  _buildUpAngle: number= 0;
  private  _horizontalDisplacement: number= 0;
  private  _kickOffPoint: number= 0;
  private  _trueVerticalDepth: number= 0;
    
  toDegrees(radians: number): number {
    return radians * (this.maxRadianValue / Math.PI)
  }
  
  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
    
  build_UpAngle(value: number): number {
      this._buildUpAngle = value;
      let radius:number = (this.valueOverbuildUp / (value * this.valuetimesbuildUp));
      return radius;
  }
    
  horizontal_Displacement(value: number, kickoffPoint: number, trueVerticalDepth: number): number {
      this._horizontalDisplacement = value;
      this._kickOffPoint = kickoffPoint;
      this._trueVerticalDepth = trueVerticalDepth;
      
      let angleX: number = (value - this.build_UpAngle(this._buildUpAngle)) /
          (this._trueVerticalDepth - this._kickOffPoint);
      return this.toDegrees(Math.atan(angleX));

  }
    
  total_AngleY(): number {
      let angleY = this.build_UpAngle(this._buildUpAngle) *
          Math.cos(this.toRadians(
              this.horizontal_Displacement(this._horizontalDisplacement, this._kickOffPoint, this._trueVerticalDepth         
          )))
          /
          (this._trueVerticalDepth - this._kickOffPoint);
      return this.toDegrees(Math.asin(angleY));
  }
    
  total_AngleXplusY(): number {
      let sumofAngleXplusY: number = this.total_AngleY() +
          this.horizontal_Displacement(this._horizontalDisplacement, this._kickOffPoint, this._trueVerticalDepth);
      return sumofAngleXplusY;
  }
    
  measured_DepthAtEndOfBuildSection(kickoffPoint: number): number {
      this._kickOffPoint = kickoffPoint;
      let setMeasuredDepth = this.total_AngleXplusY() * this.valuetimesTotalAngleXplusY * Math.PI *
                                this.build_UpAngle(this._buildUpAngle)
                                /
          this.valueDividebyBuildUpAngle + kickoffPoint;
      return setMeasuredDepth;
  }
    
  trueVertical_DepthAtEndOfBuild(KickOffPoint: number): number {
      this._kickOffPoint = KickOffPoint;
      let trueVerticalDepthCompute: number = this.build_UpAngle(this._buildUpAngle) *
          Math.sin(this.toRadians(this.total_AngleXplusY())) + KickOffPoint;
      return trueVerticalDepthCompute;
  }
    
  horizontal_DeviationAtEndOfBuildUp(): number {
      let radiusValue:number = this.build_UpAngle(this._buildUpAngle);
      let cosValue: number = radiusValue * Math.cos(this.toRadians(this.total_AngleXplusY()));
      return (radiusValue - cosValue);
    }
    
  total_MeasuredDepth(trueVerticalDepth: number, kickoffPoint: number): number {
    this._kickOffPoint = kickoffPoint;
    this._trueVerticalDepth = trueVerticalDepth;
    let totalMeasuredDepth:number  =  trueVerticalDepth - kickoffPoint;
    let Rsina:number = this.build_UpAngle(this._buildUpAngle) * Math.sin(this.toRadians(this.total_AngleXplusY()));
    let cosA: number = Math.cos(this.toRadians(this.total_AngleXplusY()))
    let getTrueVerticalDepth:number = this.measured_DepthAtEndOfBuildSection(this._kickOffPoint);
    let setFromArcToTarget = (totalMeasuredDepth - Rsina) / cosA;
    let totalDepth = setFromArcToTarget + getTrueVerticalDepth;
    return totalDepth;
  }
}

let drilling = new directionalDrilling();
console.log("Radius = " + drilling.build_UpAngle(2));
console.log("Angle X = " + drilling.horizontal_Displacement(3000, 2000, 10000))
console.log("Angle Y = " + drilling.total_AngleY())
console.log("Angle (X+Y) = " +  drilling.total_AngleXplusY())
console.log("Measured Depth At the End of Build = " + drilling.measured_DepthAtEndOfBuildSection(2000))
console.log("Horizontal Deviation at End of Build = " + drilling.horizontal_DeviationAtEndOfBuildUp())
console.log("Total Measured Depth = " + drilling.total_MeasuredDepth(10000,2000))

