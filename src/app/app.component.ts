import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { SettingsService } from './services/settings.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [style({ opacity: 0 }), animate(4200)]),
      transition('* => void', [animate(4200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'vocabulary-spa';
  themeSub: Subscription;
  activeTheme: string;
  windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  extraPixies: boolean = false;
  typeOfOS: string;

  pixie: boolean;
  pixieSub: Subscription;
  constructor(
    private groupService: GroupService,
    private wordService: WordManageService,
    private settings: SettingsService,
    private afs: AngularFirestore

  ) { }

  ngOnInit() {

    this.afs.collection("test").snapshotChanges().subscribe(items => {
      console.log(items.map(x => x.payload.doc.data()))
    })
    //Theme conf
    this.settings.getTheme();
    this.themeSub = this.settings.activeThemeSub.subscribe((theme) => {
      this.activeTheme = theme;
    });
    //Pixie

    // Fetching app settings from local storage
    this.settings.getTranslateDirection();
    this.settings.getExerciseMode();

    this.typeOfOS = window.navigator.platform;
    if (this.windowsPlatforms.includes(this.typeOfOS)) {
      this.extraPixies = true;
    }
    this.settings.getPixieStatus();
    this.pixieSub = this.settings.pixieSub.subscribe((status) => {
      this.pixie = status;
    });
  }

  ngAfterViewInit() { }

  ngOnDestroy(): void {
    this.themeSub.unsubscribe();
    this.pixieSub.unsubscribe();
  }

  returnThemeClass() {
    if (this.activeTheme === 'blue') {
      return 'tracing-paper-blue';
    }
    if (this.activeTheme === 'brown') {
      return 'tracing-paper-brown';
    }
  }
}
