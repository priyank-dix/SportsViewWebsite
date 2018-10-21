import { Chart } from 'angular-highcharts';

export class PlayerModel {
  public playerId: number;
  public averageHue: number;
  public timeDiff: number[];
  public speed: number[];
  public distanceTraveled: number[];
  public position: PositionModel[];
  public chart?: Chart;
}

export class PositionModel {
  x: number;
  y: number;
  time: Date;
}
