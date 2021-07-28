import { DirectionDrillingMethods } from "./directionalDrillingMethods";

export class DirectionalDrilling implements DirectionDrillingMethods {

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
      const radius:number = (this.valueOverbuildUp / (value * this.valuetimesbuildUp));
      return radius;
  }
    
  horizontal_Displacement(value: number, kickoffPoint: number, trueVerticalDepth: number): number {
      this._horizontalDisplacement = value;
      this._kickOffPoint = kickoffPoint;
      this._trueVerticalDepth = trueVerticalDepth;
      
      const angleX: number = (value - this.build_UpAngle(this._buildUpAngle)) /
          (this._trueVerticalDepth - this._kickOffPoint);
      return this.toDegrees(Math.atan(angleX));

  }
    
  total_AngleY(): number {
      const angleY = this.build_UpAngle(this._buildUpAngle) *
          Math.cos(this.toRadians(
              this.horizontal_Displacement(this._horizontalDisplacement, this._kickOffPoint, this._trueVerticalDepth         
          )))
          /
          (this._trueVerticalDepth - this._kickOffPoint);
      return this.toDegrees(Math.asin(angleY));
  }
    
  total_AngleXplusY(): number {
      const sumofAngleXplusY: number = this.total_AngleY() +
          this.horizontal_Displacement(this._horizontalDisplacement, this._kickOffPoint, this._trueVerticalDepth);
      return sumofAngleXplusY;
  }
    
  measured_DepthAtEndOfBuildSection(kickoffPoint: number): number {
      this._kickOffPoint = kickoffPoint;
      const setMeasuredDepth = this.total_AngleXplusY() * this.valuetimesTotalAngleXplusY * Math.PI *
                                this.build_UpAngle(this._buildUpAngle)
                                /
          this.valueDividebyBuildUpAngle + kickoffPoint;
      return setMeasuredDepth;
  }
    
  trueVertical_DepthAtEndOfBuild(KickOffPoint: number): number {
      this._kickOffPoint = KickOffPoint;
      const trueVerticalDepthCompute: number = this.build_UpAngle(this._buildUpAngle) *
          Math.sin(this.toRadians(this.total_AngleXplusY())) + KickOffPoint;
      return trueVerticalDepthCompute;
  }
    
  horizontal_DeviationAtEndOfBuildUp(): number {
      const radiusValue:number = this.build_UpAngle(this._buildUpAngle);
      const cosValue: number = radiusValue * Math.cos(this.toRadians(this.total_AngleXplusY()));
      return (radiusValue - cosValue);
    }
    
  total_MeasuredDepth(trueVerticalDepth: number, kickoffPoint: number): number {
    this._kickOffPoint = kickoffPoint;
    this._trueVerticalDepth = trueVerticalDepth;
    const totalMeasuredDepth:number  =  trueVerticalDepth - kickoffPoint;
    const Rsina:number = this.build_UpAngle(this._buildUpAngle) * Math.sin(this.toRadians(this.total_AngleXplusY()));
    const cosA: number = Math.cos(this.toRadians(this.total_AngleXplusY()))
    const getTrueVerticalDepth:number = this.measured_DepthAtEndOfBuildSection(this._kickOffPoint);
    const setFromArcToTarget = (totalMeasuredDepth - Rsina) / cosA;
    const totalDepth = setFromArcToTarget + getTrueVerticalDepth;
    return totalDepth;
  }
}