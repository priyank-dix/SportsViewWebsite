import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from './models/player';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

const CACHE_SIZE = 1;
const BASE_URL = 'https://xkscasu3ie.execute-api.us-east-2.amazonaws.com/api';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private players$: Observable<Array<Player>>;

  constructor(private http: HttpClient) { }

  public get players() {
    return this.players$ ? this.players$ :
      this.players$ = this.getAllPlayers().pipe(shareReplay(CACHE_SIZE));
  }

  private getAllPlayers = () => this.http.get<Player[]>(`${BASE_URL}/players/all`);
}
