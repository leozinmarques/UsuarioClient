import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './formfield-error.component.html',
  styleUrls: ['./formfield-error.component.css']
})
export class FormFieldErrorComponent {

  @Input('form-control') formControl: FormControl;
  public getErrorMessage(): string | null {
    if(this.formControl.touched||this.formControl.dirty){
      if (this.formControl.errors.required) {
        return 'CAMPO OBRIGATÓRIO';
      } else if (this.formControl.errors.minlength) {
        const requiredLength = this.formControl.errors.minlength.requiredLength;
        return `Deve ter no mínimo ${requiredLength} caracteres`;
      } else if (this.formControl.errors.maxlength) {
        const requiredLength = this.formControl.errors.maxlength.requiredLength;
        return `Deve ter no máximo ${requiredLength} caracteres`;
      } else if (this.formControl.errors.email) {
        return 'Formato de email inválido';
      } else if (this.formControl.errors.invalidDate) {
        return 'Informe uma data válida'
      }
    }
  }
}
