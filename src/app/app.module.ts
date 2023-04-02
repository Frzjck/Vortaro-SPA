import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '@angular/cdk/text-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyVocabComponent } from './my-vocab/my-vocab.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SpellingComponent } from './exercises/spelling/spelling.component';
import { ProgressBarComponent } from './exercises/progress-bar/progress-bar.component';
import { ResultsComponent } from './exercises/results/results.component';
import { RatingUIComponent } from './/my-vocab/rating-ui/rating-ui.component';
import { WordFormComponent } from './my-vocab/word-form/word-form.component';
import { GroupFormComponent } from './my-vocab/group-form/group-form.component';
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { SettingsPopupComponent } from './navbar/settings-popup/settings-popup.component';
import { TypeTestComponent } from './exercises/type-test/type-test.component';
import { ExtraTrCardComponent } from './my-vocab/extra-tr-card/extra-tr-card.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    MyVocabComponent,
    ExercisesComponent,
    SpellingComponent,
    ProgressBarComponent,
    ResultsComponent,
    RatingUIComponent,
    WordFormComponent,
    GroupFormComponent,
    StopPropagationDirective,
    SettingsPopupComponent,
    TypeTestComponent,
    ExtraTrCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    MatIconModule,
    TextFieldModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
