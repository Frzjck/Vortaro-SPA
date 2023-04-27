import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';


import { GlossaryState } from './glossary.state';
import { WordGridComponent } from './components/word-grid/word-grid.component';
import { GroupActionPanelComponent } from './components/group-action-panel/group-action-panel.component';

@Component({
  selector: 'app-glossary',
  standalone: true,

  imports: [CommonModule, MatExpansionModule, WordGridComponent, MatIconModule, GroupActionPanelComponent],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
  providers: [GlossaryState],
})
export class GlossaryComponent implements OnInit {
  // [groupId]="groupsAndWords.group.id"
  // [groupEditId]="groupEditId"
  // [editMode]="editMode"
  // [newWordMode]="newWordMode"
  // [words]="groupsAndWords.words$ | async"
  // [score]="groupsAndWords.group.averageProficiency"
  // [expanded]="preventCollapse(groupsAndWords.group.id)"

  constructor(
    public GlossaryState: GlossaryState
  ) { }

  ngOnInit(): void { }
  preventCollapse() { }
  // To hide collapse all button on 0 additional translates groups


}
