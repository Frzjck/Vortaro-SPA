import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomRoutingModule } from './classroom-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    StoreModule.forFeature('lexicon', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class ClassroomModule { }
