import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppLayoutDashboardComponent } from './app-layout-dashboard/app-layout-dashboard.component';
import { AppLayoutDefaultComponent } from './app-layout-default/app-layout-default.component';
import { HeaderComponent } from '../shared/components/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    AppLayoutDashboardComponent,
    AppLayoutDefaultComponent,
    HeaderComponent
  ]
})

export class AdminLayoutModule { }
