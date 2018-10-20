import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Player } from '../models/player';
import { Chart } from 'angular-highcharts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytic-view',
  templateUrl: './analytic-view.component.html',
  styleUrls: ['./analytic-view.component.scss']
})
export class AnalyticViewComponent implements OnInit {
  public players: Player[];
  public chart: Chart;

  constructor(private service: AppService, private router: Router) {
    this.players = [];
  }

  ngOnInit() {
    this.service.players.subscribe((data) => {
      this.players = data;
    });
  }

  viewPlayer = (player: Player) => {
    this.router.navigate(['focused'], {
      queryParams: {
        'player': player.player
      }
    });
  }

}
