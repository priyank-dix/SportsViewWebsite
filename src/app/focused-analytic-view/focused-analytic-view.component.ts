import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../models/player';
import { AppService } from '../app.service';
import { mergeMap, map, tap } from 'rxjs/operators';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-focused-analytic-view',
  templateUrl: './focused-analytic-view.component.html',
  styleUrls: ['./focused-analytic-view.component.scss']
})
export class FocusedAnalyticViewComponent implements OnInit {
  player: Player;

  constructor(private route: ActivatedRoute, private service: AppService) {
    this.player = <Player>{};
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      mergeMap((params) => this.service.players.pipe(
        map((players) => players.find((player) => player.player === params['player']))
      )),
      tap(this.makeChart)
    ).subscribe((player) => {
      this.player = player;
    });
  }

  makeChart = (player: Player) => {
    player.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: player.player
      },
      xAxis: {
        type: 'datetime'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Speed',
          // @ts-ignore
          data: Object.keys(player.speed).sort((a, b) => (+a) > (+b) ? 1 : -1).map((key) => [+key, player.speed[key]])
        }
      ]
    });
  }

}
