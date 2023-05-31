import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent {

  onCancel() {
    console.log("onCancel");
  }
  onSave() {
    console.log("onSave");
  }
  onAddTips() {
    console.log("onAddTips");
  }
  onAddTranslation() {
    console.log("onAddTranslation");
  }
}
