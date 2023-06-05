import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordFormService } from '../services/word-form.service';

@Component({
  selector: 'app-form-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent {


  constructor(private wordForm: WordFormService) { }

  onAddTranslation = () => this.wordForm.onAddTranslation();
  onAddTips = () => this.wordForm.onAddTips();

  onCancel = () => this.wordForm.onCloseForm();
  onSave = () => this.wordForm.onSubmitForm();
}
