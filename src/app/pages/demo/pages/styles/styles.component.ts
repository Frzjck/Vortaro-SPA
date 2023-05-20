import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-styles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss']
})
export class StylesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
