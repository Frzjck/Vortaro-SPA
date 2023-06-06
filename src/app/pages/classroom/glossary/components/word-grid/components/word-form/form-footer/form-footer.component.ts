import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordFormService } from '../services/word-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent {
  @Input() parent: FormGroup;

  constructor(private wordForm: WordFormService) { }

  onAddTranslation = () => this.wordForm.onAddTranslation();
  onAddTips = () => this.wordForm.onAddTips();

  onCancel = () => this.wordForm.onCloseForm();
  onSave = () => this.wordForm.onSubmitForm();
}
