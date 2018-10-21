import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { AnalyticViewComponent } from './analytic-view/analytic-view.component';
import { MultiViewComponent } from './multi-view/multi-view.component';
import { TrackingViewComponent } from './tracking-view/tracking-view.component';
import { FocusedAnalyticViewComponent } from './focused-analytic-view/focused-analytic-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainViewComponent
  },
  {
    path: 'analytic',
    component: AnalyticViewComponent
  },
  {
    path: 'multi',
    component: MultiViewComponent
  },
  {
    path: 'tracking',
    component: TrackingViewComponent
  },
  {
    path: 'focused',
    component: FocusedAnalyticViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
