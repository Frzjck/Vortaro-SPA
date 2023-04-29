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
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// At App
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { HomepageComponent } from '@app/homepage/homepage.component';
import { MyVocabComponent } from '@app/my-vocab/my-vocab.component';
import { ExercisesComponent } from '@app/exercises/exercises.component';
import { SpellingComponent } from '@app/exercises/spelling/spelling.component';
import { ProgressBarComponent } from '@app/exercises/progress-bar/progress-bar.component';
import { ResultsComponent } from '@app/exercises/results/results.component';
import { RatingUIComponent } from '@app//my-vocab/rating-ui/rating-ui.component';
import { WordFormComponent } from '@app/my-vocab/word-grid/word-form/word-form.component';
import { GroupFormComponent } from '@app/my-vocab/group-form/group-form.component';
import { StopPropagationDirective } from '@app/directives/stop-propagation.directive';
import { SettingsPopupComponent } from '@app/navbar/settings-popup/settings-popup.component';
import { TypeTestComponent } from '@app/exercises/type-test/type-test.component';
import { WordGridComponent } from '@app/my-vocab/word-grid/word-grid.component';

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
    MatIconModule,
    TextFieldModule,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    WordGridComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
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
