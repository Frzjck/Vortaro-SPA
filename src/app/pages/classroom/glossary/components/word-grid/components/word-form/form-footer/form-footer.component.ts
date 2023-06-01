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


  constructor(private footer: WordFormService) { }

  onAddTranslation = () => this.footer.onAddTranslation();
  onAddTips = () => this.footer.onAddTips();

  onCancel = () => this.footer.onCloseForm();
  onSave = () => this.footer.onSubmitForm();
}
