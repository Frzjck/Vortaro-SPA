import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Group } from '../../models/group-model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit, AfterViewInit {
  @Input() group: Group;
  groupForm: FormGroup;
  @Output() onFinishSubmit = new EventEmitter();
  @ViewChild('groupNameInput') private groupNameInput: ElementRef;
  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    if (this.group) {
      this.groupForm = new FormGroup({
        groupName: new FormControl(this.group.name, [Validators.required]),
      });
    } else {
      this.groupForm = new FormGroup({
        groupName: new FormControl(null, [Validators.required]),
      });
    }
  }

  ngAfterViewInit(): void {
    // Making sure input is focused
    window.setTimeout(() => {
      this.groupNameInput.nativeElement.focus();
    });
  }
  sendEmit() {
    window.setTimeout(() => {
      this.onFinishSubmit.emit();
    }, 200);
  }
  onSubmit() {
    if (this.group) {
      // Edit existing group
      this.groupService
        .createGroup(this.groupForm.value.groupName, this.group.groupNum)
        .subscribe(() => {
          this.groupService.loadGroups();
        });
    } else {
      // Create new group
      this.groupService
        .createGroup(this.groupForm.value.groupName)
        .subscribe(() => {
          this.groupService.loadGroups();
        });
    }
    this.onFinishSubmit.emit();
  }
}
