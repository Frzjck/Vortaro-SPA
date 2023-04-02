import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { GroupService } from '@app/services/group.service';
import { WordManageService } from '@app/services/word-manage.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [style({ opacity: 0 }), animate(500)]),
      transition('* => void', [animate(500, style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  logInFailed: boolean = false;

  constructor(
    public authService: AuthService,
    private groupService: GroupService,
    private wordService: WordManageService
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((response) => {
        this.logInFailed = !response;
        setTimeout(() => {
          this.logInFailed = false;
        }, 3600);
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();

    this.fetchAndUpdate();
  }

  async fetchAndUpdate() {
    this.wordService.getWordsFromServer();
    await firstValueFrom(this.wordService.wordsObsListener());

    this.groupService.getGroupsFromServer();
    await firstValueFrom(this.wordService.wordsObsListener());
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
