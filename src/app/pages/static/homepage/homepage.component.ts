import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    trigger('scrollSlide', [
      // state('void', style({ transform: 'translateX(150%)' })),
      state('hidden', style({})),
      state('show', style({ transform: 'translateX(0)' })),

      // transition('void => show', animate('1200ms ease-out')),
      transition('hidden => show', animate('900ms ease-out')),
      transition('show => hidden', animate('700ms ease-in')),
    ]),
    trigger('fadeInTitle', [
      transition('void => *', [
        style({ transform: 'translateY(-150%)', opacity: 0 }),
        animate('900ms cubic-bezier(.44,.16,.36,.98)'),
      ]),
    ]),
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('4000ms cubic-bezier(.44,.16,.36,.98)'),
      ]),
    ]),
  ],
})
export class HomepageComponent implements OnInit, AfterViewInit {
  public screenHeight: any;
  children;
  sectionStateArray: string[] = [];
  sectionState = 'show';
  yOffset = 0;
  sectionHeightArr = [];

  constructor() { }
  testTriggerButton() {
    if (this.sectionState === 'hidden') {
      this.sectionState = 'show';
    } else if (this.sectionState === 'show') {
      this.sectionState = 'hidden';
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenHeight = window.innerHeight;
    this.shouldISlide();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    this.yOffset = window.pageYOffset;
    this.shouldISlide();
  }

  @ViewChild('container') containerEl: ElementRef;

  ngOnInit() {
    this.screenHeight = window.innerHeight;
  }

  ngAfterViewInit() {
    this.children = this.containerEl.nativeElement.children;
    this.onInitChildrenHeights();
  }

  shouldISlide() {
    // We rest headerSpace to compensate for nav and title
    const headerSpace = 90;
    const margin = 32;
    let spaceLeft = this.screenHeight - headerSpace + this.yOffset;

    // this function allows to slide in elements that fit half way
    for (let i = 0; i < this.children.length; i++) {
      if (i > 0) {
        spaceLeft =
          spaceLeft -
          this.sectionHeightArr[i - 1] / 2 -
          this.sectionHeightArr[i] / 2 -
          margin;
      } else if (i === 0) {
        spaceLeft = spaceLeft - this.sectionHeightArr[i] / 2 - margin;
      }

      if (spaceLeft < 0) {
        this.sectionStateArray[i] = 'hidden';
        return;
      }
      this.sectionStateArray[i] = 'show';
    }
  }
  assignHide() {
    for (let i = 0; i < this.children.length; i++) {
      setTimeout(() => {
        this.sectionStateArray.push('hidden');
      }, 500);
    }
  }

  // Creating array of section heights
  onInitChildrenHeights() {
    this.assignHide();
    setTimeout(() => {
      for (let i = 0; i < this.children.length; i++) {
        this.sectionHeightArr[i] =
          this.containerEl.nativeElement.children[i].offsetHeight;
      }
      this.shouldISlide();
    }, 1000);
  }
}
