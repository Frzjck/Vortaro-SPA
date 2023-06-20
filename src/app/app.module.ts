import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// At App
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HomepageComponent } from '@app/pages/static/homepage/homepage.component';
import { SettingsPopupComponent } from '@app/components/navbar/components/settings-popup/settings-popup.component';
import { ThemeModule } from './theme';

// Environment
import { environment } from "@env/environment";

// Firebase
import { AngularFireModule } from "@angular/fire/compat";
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
} from "@angular/fire/compat/firestore";
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from "@angular/fire/compat/auth";
import {
  AngularFireStorageModule,
  USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
} from "@angular/fire/compat/storage";

// NgRx
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';
import { LetDirective } from '@ngrx/component';


import { NotificationModule } from './services';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StopPropagationDirective } from './shared/directives/stop-propagation.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SettingsPopupComponent,
    HomepageComponent,
  ],
  imports: [
    NotificationModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    StopPropagationDirective,
    LetDirective,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ThemeModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      },
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 15,
    }),
  ],
  providers: [
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulators
        ? ["http://localhost:9099"]
        : undefined,
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators
        ? ["localhost", 8080]
        : undefined,
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators
        ? ["http://localhost:5001"]
        : undefined,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
