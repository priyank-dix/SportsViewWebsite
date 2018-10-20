import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { AnalyticViewComponent } from './analytic-view/analytic-view.component';
import { FieldViewComponent } from './field-view/field-view.component';
import { HighlightViewComponent } from './highlight-view/highlight-view.component';
import { MultiViewComponent } from './multi-view/multi-view.component';
import { TrackingViewComponent } from './tracking-view/tracking-view.component';

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
    path: 'field',
    component: FieldViewComponent
  },
  {
    path: 'highlight',
    component: HighlightViewComponent
  },
  {
    path: 'multi',
    component: MultiViewComponent
  },
  {
    path: 'tracking',
    component: TrackingViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
