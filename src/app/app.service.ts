import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, LiteStats } from './models/player';
import { Observable, timer } from 'rxjs';
import { shareReplay, map, switchMap } from 'rxjs/operators';
import { DataAPIModel, DataModel } from './models/data';
import { PlayerModel } from './models/stats';

const CACHE_SIZE = 1;
const BASE_URL = 'https://xkscasu3ie.execute-api.us-east-2.amazonaws.com/api';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private players$: Observable<Array<Player>>;
  private data$: Observable<Array<DataModel>>;
  private stats$: Observable<Array<PlayerModel>>;
  public ball: PlayerModel;

  constructor(private http: HttpClient) { }

  public get players() {
    return this.players$ ? this.players$ :
      this.players$ = this.getAllPlayers().pipe(shareReplay(CACHE_SIZE));
  }

  public get data() {
    return this.data$ ? this.data$ :
      this.data$ = this.getData().pipe(shareReplay(CACHE_SIZE));
  }

  public get stats() {
    const timer$ = timer(0, 5000);
    return this.stats$ ? this.stats$ :
      this.stats$ = timer$.pipe(switchMap(_ => this.getStats()), shareReplay(CACHE_SIZE));
  }

  private getAllPlayers = () => this.http.get<Player[]>(`${BASE_URL}/players/all`);

  private getData = () => this.http.get<DataAPIModel[]>(`${BASE_URL}/data/all`)
    .pipe(map((data) => data.map(DataModel.CONVERT_API_MODEL)))

  private getStats = () => this.http.get<PlayerModel[]>(`${BASE_URL}/stats`);

  public getLiteStats = () => this.http.get<LiteStats[]>(`${BASE_URL}/stats/lite`);

  public getStatsNum = () => this.http.get<{ size: number }>(`${BASE_URL}/stats/num`);

  filterBall = (stats: PlayerModel[]) => {
    this.ball = stats.find((value) => value.averageHue === -1);
    return stats.filter((value) => value.averageHue !== -1);
  }

  public hsvToRgb = (h, s, v) => {
    let r, g, b;
    h = h * 2;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return this.hex(r * 255, g * 255, b * 255);
  }

  public hex = (r, g, b) => '#' + this.hexConv(r) + this.hexConv(g) + this.hexConv(b);

  public hexConv = (num) => {
    let hex = Number(Math.floor(num)).toString(16);
    if (hex.length < 2) {
      hex = '0' + hex;
    }
    return hex;
  }

  public cumulativeSum = ([head, ...tail]): any[] =>
    tail.reduce((acc, x, index) => {
      acc.push({
        distance: acc[index].distance + x.distance,
        time: acc[index].time + x.time
      });
      return acc;
    }, [head])
}
