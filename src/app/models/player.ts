import { Chart } from 'angular-highcharts';

export class Player {
  player: string;
  height: number;
  weight: number;
  speed: Speeds;
  chart?: Chart;
}

class Speeds {
  [id: string]: number;
}
