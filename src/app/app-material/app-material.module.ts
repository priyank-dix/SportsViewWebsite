import { NgModule } from '@angular/core';
import { MatToolbarModule, MatMenuModule, MatButtonModule, MatButtonToggleModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  declarations: []
})
export class AppMaterialModule { }
